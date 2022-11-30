import {db} from "../utils/db";
import {Converter} from "showdown";

export default function Path ({ page, modules }) {
    // Render each module
    const content = modules.map(module => {
        return (
            <div key={module.id} className={'mdhb-module'}>
                <div dangerouslySetInnerHTML={{ __html: module.content }} />
                <hr />
            </div>
        );
    });

    return (
        <div>
            <h1>{page.name}</h1>
            {content}
        </div>
    );
}

export async function getStaticPaths() {
    const { Pages } = await db();
    const pages = await Pages.findAll({
        attributes: ['id', 'path', 'name'],
        where: {
            enabled: true
        },
        raw: true,
    });

    // Strip the leading slash from each path as we map it to the params
    const paths = pages.map(page => ({
        params: { path: page.path.substring(1) }
    }));

    return { paths, fallback: false };
}

export async function getStaticProps(context) {
    const { Modules, Pages } = await db();
    const converter = new Converter();

    // get the page for this path
    const page = await Pages.findOne({
        attributes: ['id', 'path', 'name'],
        where: {
            path: '/' + context.params.path,
            enabled: true
        },
        raw: true,
    });

    // get the modules for this page
    const modules = (await Modules.findAll({
        attributes: ['id', 'content'],
        where: {
            page_id: page.id,
        },
        raw: true,
        order: [
            ['list_order', 'ASC']
        ],
    })).map(module => {
        // Replace the module content with the rendered markdown
        module.content = converter.makeHtml(module.content);
        return module;
    });

    return {
        props: {
            page: page,
            modules: modules,
        }
    };
}
