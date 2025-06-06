import { Navigate, Route, Routes } from "react-router-dom";
import Feed from "../../posts/feed/Feed";
import Profile from "../../posts/profile/Profile";
import NotFound from "../not-found/NotFound";
import EditPost from "../../posts/edit/EditPost";


export default function Routing(): JSX.Element {

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/profile" />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/edit/:id" element={<EditPost />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}