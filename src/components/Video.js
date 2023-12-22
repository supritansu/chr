import ReactPlayer from 'react-player'
const Video = ({ props }) => {
    console.log("I have been called")
    console.log(props)
    return (
        <div>
            <ReactPlayer url={props} controls={true} />
        </div>
    )
}
export default Video;