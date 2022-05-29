import Container from "@mui/material/Container";
import { NextPage } from "next";

import User from "../src/models/User";
import { fetcher } from "../src/api";

interface Props {
    users: User[],
};

const Users: NextPage<Props> = (props) => {
    let { users } = props;

    return (
        <Container maxWidth="lg">
            {(users.length > 0)
                ? users.map((user: User) => <h1 key={user.username}>{user.username}</h1>)
                : "No users"}
        </Container>
    );
}

export async function getServerSideProps(_context: any) {
    const users: User[] = await fetcher("/users");

    return {
        props: {
            users,
        },
    }
}

export default Users;
