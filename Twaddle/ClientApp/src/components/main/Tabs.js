// Tabs.js
import React, { useState } from 'react';

const Tabs = () => {
    const [activeTab, setActiveTab] = useState('matches');

    const matches = [
        { id: 1, name: 'Никита 1'},
        { id: 2, name: 'Никита 2'},
    ];

    const messages = [
        { id: 1, name: 'Сообщение 1'},
        { id: 2, name: 'Сообщение 2'},
    ];
    
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="d-inline-block justify-content-center">
            <div className="tab-header">
                <button className={activeTab === 'matches' ? 'active' : ''} onClick={() => handleTabClick('matches')}>
                    Совпадения
                </button>
                <button className={activeTab === 'messages' ? 'active' : ''} onClick={() => handleTabClick('messages')}>
                    Сообщения
                </button>
            </div>
            <div className="tab-content">
                {activeTab === 'matches' && (
                    <ul>
                        {matches.length > 0 ? (matches.map((matche) => (
                            <li key={matche.id}>
                                <a >{matche.name}</a>
                            </li>
                        ))) : (
                            <p>Совпадений нет.</p>
                        )}
                    </ul>
                )}
                {activeTab === 'messages' && (
                    <ul>
                        {messages.length > 0 ? (messages.map((message) => (
                            <li key={message.id}>
                                <a >{message.name}</a>
                            </li>
                        ))) : (
                            <p>Собщений нет.</p>
                        )}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Tabs;
