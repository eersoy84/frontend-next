// react
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../../store/userAccount';
import AccountPageTabs from '../../../components/account/AccountPageTabs';
import { useRouter } from 'next/router'
import { wrapper } from '../../../store/configureStore'
import {
    login
} from '../../../store/userAccount/userAccountActions';
export default function AccountPageLogout() {
    const { query } = useRouter()
    const { tab } = query
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(logout())
    }, [])
    return (
        <>
            <AccountPageTabs defaultTab={tab && tab[0]} />
        </>
    )
}
// export const getServerSideProps = wrapper.getServerSideProps(
//     (store) =>
//         async ({ req, res }) => {
//             const { data } = await store.dispatch(login({ email: 'eyup@gmail.com', password: 'asdfgh1' }));
//             const allProfiles = JSON.parse(JSON.stringify(data))
//             console.log("deee",data.user)
//             console.log("deee",allProfiles)
//             return {
//                 props: {
//                     user:allProfiles
//                 }
//             };
//         });