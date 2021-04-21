import HandleUser from "./HandleUser"
import HandleRegister from "./HandleRegister"
import Tweets from "./Tweets"


const Main = () => {
    return (
        <div>
            <Tweets/>
            {/* <HandleUser/> */}
            <HandleRegister/>
        </div>
    )
}

export default Main

