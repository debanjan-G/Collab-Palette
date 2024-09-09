/* eslint-disable react/prop-types */

import Forms from '../../components/Forms'

const HomePage = ({ socket, userData, setUserData }) => {
    return (
        <div>
            <Forms socket={socket} userData={userData} setUserData={setUserData} />
        </div>
    )
}

export default HomePage
