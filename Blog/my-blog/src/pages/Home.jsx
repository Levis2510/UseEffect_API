import { Link } from 'react-router-dom';

function Home(){
    return(
        <div className='flex flex-col items-center justify-center bg-teal-50 gap-6 p-6 shadow rounded-lg'> 
            <h1 className='text-5xl text-green-500 font-bold'>✨ Chào mừng đến với Blog của mình!</h1>
            <p className='text-2xl font-semibold'>Nơi mình chia sẻ những kiến thức, kinh nghiệm và cảm hứng về lập trình, công nghệ và cuộc sống. Mỗi bài viết là một hành trình nhỏ, ghi lại những gì mình học được và muốn chia sẻ lại cho cộng đồng.</p>
        </div>
    );
}

export default Home;    