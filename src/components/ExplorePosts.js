



const ExplorePosts = ({post, currUser, setShowComment, setPic, setPost, profile, setAnyUser}) => {



    const handleClick = (e) => {


        e.preventDefault()



        setShowComment(true)
        setPic(post.image_url)
        setPost(post)


    }



    return(
        <div className='postsExplore'>
            <img src={post.image_url} alt='pic' className='explorePost' onClick={(e) => handleClick(e)} />
        </div>
    )
} 



export default ExplorePosts