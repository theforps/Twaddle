import React, {useEffect, useState} from 'react';
import {GetNews} from "../requests/NewsQueries";

const NewsMenu = () => {
    const [newPost, setNewPost] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [news, setNews] = useState([]);
    
    
    const loadNews = async(data) => {
        
        const result = await GetNews(data);
        
        setNews(result);
    }

    useEffect(() => {
        loadNews()
    }, []);
    
    const handleNewPostChange = (e) => {
        setNewPost(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        // Реализация поиска может быть добавлена здесь
    };

    const handlePostSubmit = (e) => {
        e.preventDefault();
        if (newPost.trim() !== '') {
            const newNewsItem = {
                text: newPost,
                user: 'User123', // здесь можно добавить логику для выбора пользователя
                date: new Date().toLocaleString(),
                likes: 0,
            };
            setNews([newNewsItem, ...news]);
            setNewPost('');
        }
    };

    const handleLike = (index) => {
        const updatedNews = [...news];
        updatedNews[index].likes += 1;
        setNews(updatedNews);
    };

    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder="What's happening?"
                    value={newPost}
                    onChange={handleNewPostChange}
                />
                <button onClick={handlePostSubmit}>Post</button>
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                {/* Реализация поисковика может быть добавлена здесь */}
            </div>
            <div>
                {news != null && news.map(item => (
                    <div>
                        <p>{item.description}</p>
                        <p>{item.creator.name}</p>
                        <p>{item.createdTime}</p>
                        <p>{item.fans.length}</p>
                        
                        {/*{//<button onClick={() => handleLike(index)}>Like</button>}*/}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsMenu;