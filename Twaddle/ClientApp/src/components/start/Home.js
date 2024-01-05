import React, {useState} from 'react';
import {Login, Registration} from '../requests/JoinQueries'
import ModalButton from "../start/ModelBtn";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const [step, setStep] = useState(1);
    const [resultReg, setResult] = useState('');
    const [userData, setUserData] = useState({
        sex: '',
        nick: '',
        goal: '',
        age: 16,
        country: '',
        desc: '',
        education: '',
        login: '',
        password: '',
    });
    
    const handleStepSubmit = (stepData) => {
        setUserData({ ...userData, ...stepData });
        setStep(step + 1);
    };

    const handlePrevStep = () => {
        setStep(step - 1);
    };
    
    const registration = async() =>
    {
        const result = await Registration(userData);
        
        setResult(result.data.description);
    }
    
    const login = async() => {
        
        const result = await Login(loginUser);
        
        console.log(result.data.data);
    }
    
    const loginUser = {
        Login: '',
        Password: ''
    }
    
    return (
        <div>
            <header>
                <nav className="navbar bg-info p-2">
                    <a className="navbar-brand" href="/">Twaddle</a>
                    <ul className="navbar-nav flex-grow">
                        <ModalButton
                            btnName={'Войти'}
                            title={'Вход в систему'}
                            modalContent= {
                                <div>
                                    <div>
                                        <label>Логин:</label>
                                        <input 
                                            type="text" 
                                            placeholder="Введите логин"
                                            onChange={e => 
                                                loginUser.Login = e.target.value}
                                        />
                                    </div>
                                    <div>
                                        <label >Пароль:</label>
                                        <input 
                                            type="password"
                                            placeholder="Введите пароль"
                                            onChange={e =>
                                                loginUser.Password = e.target.value}
                                        />
                                    </div>
                                    <button className="succes" onClick={() => login()}>Войти</button>
                                </div>
                            }
                        />
                    </ul>
                </nav>
            </header>
            <div>
                {step === 1 && <SelectSex data={userData} onSubmit={handleStepSubmit} />}
                {step === 2 && <EnterNick data={userData} onSubmit={handleStepSubmit} />}
                {step === 3 && <SelectGoal data={userData} onSubmit={handleStepSubmit} />}
                {step === 4 && <EnterAge data={userData} onSubmit={handleStepSubmit} />}
                {step === 5 && <EnterCountry data={userData} onSubmit={handleStepSubmit} />}
                {step === 6 && <EnterEducation data={userData} onSubmit={handleStepSubmit} />}
                {step === 7 && <EnterDesc data={userData} onSubmit={handleStepSubmit} />}
                {step === 8 && <EnterInfo data={userData} onSubmit={handleStepSubmit} />}
                {step > 1 && (
                    <button onClick={handlePrevStep}>Previous</button>
                )}
                {step === 9 && registration()}
            </div>

        </div>
    );
    
};

export default Home;

const SelectSex = ({ data, onSubmit }) => {
    const [sex, setSex] = useState(data.name || '');

    const handleSexSelection = (selectedSex) => {
        setSex(selectedSex);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ sex });
    };

    return (
        <form onSubmit={handleSubmit}>
            <p>Ваш пол</p>
            <div>
                <button onClick={() => handleSexSelection('Мужчина')}>
                    Мужчина
                </button>
                <button onClick={() => handleSexSelection('Женщина')}>
                    Женщина
                </button>
            </div>
        </form>
    );
};

const EnterNick = ({ data, onSubmit }) => {
    const [nick, setNick] = useState(data.nickname || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ nick });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Ваше имя
                <input type="text" value={nick} required={true} onChange={(e) => setNick(e.target.value)} />
            </label>
            <button type="submit">Next</button>
        </form>
    );
};

const SelectGoal = ({ data, onSubmit }) => {
    const [goal, setGoal] = useState(data.name || '');

    const handleGoalSelection = (selectedGoal) => {
        setGoal(selectedGoal);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ goal });
    };

    return (
        <form onSubmit={handleSubmit}>
            <p>Ваша цель</p>
            <div>
                <button onClick={() => handleGoalSelection('Ищу бизнес-партнера')}>
                    Ищу бизнес-партнера
                </button>
                <button onClick={() => handleGoalSelection('Ищу заказчика')}>
                    Ищу заказчика
                </button>
                <button onClick={() => handleGoalSelection('Ищу исполнителя')}>
                    Ищу исполнителя
                </button>
            </div>
        </form>
    );
};

const EnterAge = ({ data, onSubmit }) => {
    const [age, setAge] = useState(data.age);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ age });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Ваш возраст
                <input type="number" min={16} required={true} onChange={(e) => setAge(e.target.value)} />
            </label>
            <button type="submit">Next</button>
        </form>
    );
};

const EnterCountry = ({ data, onSubmit }) => {
    const [country, setCountry] = useState(data.country);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ country });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Введите страну
                <input type="text" required={true} onChange={(e) => setCountry(e.target.value)} />
            </label>
            <button type="submit">Next</button>
        </form>
    );
};

const EnterEducation = ({ data, onSubmit }) => {
    const [education, setEducation] = useState(data.education);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ education });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Введите образование
                <input type="text" required={true} onChange={(e) => setEducation(e.target.value)} />
            </label>
            <button type="submit">Next</button>
        </form>
    );
};

const EnterDesc = ({ data, onSubmit }) => {
    const [desc, setDesc] = useState(data.desc);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ desc });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Введите информацио о себе и о ваших планах
                <textarea type="text" required={true} onChange={(e) => setDesc(e.target.value)} />
            </label>
            <button type="submit">Next</button>
        </form>
    );
};

const EnterInfo = ({ data, onSubmit }) => {
    const [login, setLogin] = useState(data.login);
    const [password, setPassword] = useState(data.password);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ login, password });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Введите логин
                <input type="text" required={true} onChange={(e) => setLogin(e.target.value)} />
            </label>
            <label>
                Введите пароль
                <input type="text" required={true} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button type="submit">Next</button>
        </form>
    );
};
