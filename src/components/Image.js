const Image = ({ props }) => {
    console.log("I have been called")
    console.log(props)
    return (
        <img src={props}></img>
    )
}
export default Image;