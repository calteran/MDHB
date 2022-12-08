import {db} from "../utils/db";
import {
    Box,
    Container,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography
} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import Image from "next/image";

export default function Home({ pages, title }) {
    return (
        <Container>
            <main>
                <Typography variant={'h1'}>
                    Welcome to {title}
                </Typography>
                <Grid container>
                    <Grid item xs={4}>
                        <List>
                            {pages.map(page => (
                                <ListItem key={page.id}>
                                    <ListItemButton
                                        component={'a'}
                                        href={page.path}
                                    >
                                        <ListItemText
                                            primary={page.name}
                                            primaryTypographyProps={{
                                                variant: 'button',
                                                color: 'primary'
                                            }}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                    <Grid item xs={8}>
                        <Box sx={{
                            position: 'relative',
                            width: '100%',
                            height: '100%',
                        }}>
                            <Image
                                src={process.env.HOME_IMAGE || '/images/template/cottage.jpg'}
                                alt={'Home'}
                                fill={true}
                                style={{borderRadius: '10px'}}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </main>

            <footer>
                Powered by <a target='_blank' href={'https://www.github.com/calteran/mdhb'} rel="noreferrer">My Digital Home Binder</a>.
            </footer>
        </Container>
    )
}

export async function getStaticProps() {
    const { Pages } = await db();
    const pages = await Pages.findAll({
        attributes: ['id', 'path', 'name'],
        where: {
            enabled: true
        },
        raw: true,
    });

    return {
        props: {
            pages: pages,
            title: process.env.HOME_TITLE || 'My Digital Home Binder',
        }
    }
}
