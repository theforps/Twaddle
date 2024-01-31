import React, {useEffect, useState} from 'react';
import {Login, Registration} from '../requests/JoinQueries'
import ModalButton from "../start/ModelBtn";
import {GetCountries} from "../requests/RegInfoQueries";

const StartPage = () => {
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
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        getCountries();
    }, []);
    
    const handleStepSubmit = (stepData) => {
        setUserData({ ...userData, ...stepData });
        setStep(step + 1);
    };

    const handlePrevStep = () => {
        setStep(step - 1);
    };
    
    const getCountries = async() =>
    {
        const result = await GetCountries();
        
        setCountries(result);
    }
    
    const registration = async() =>
    {
        const result = await Registration(userData);

        console.log("Информация о регистрации:");
        console.log(result.data);
        
        if(result.data.statusCode === 200) {
            setResult(result.data.description);
            return true;
        }
        
        return false;
    }
    
    const login = async() => {
        
        const result = await Login(loginUser);

        console.log("Информация о входе в систему:");
        console.log(result.data);
        
        if(result.data.statusCode === 200) {
            
            sessionStorage.setItem('token', result.data.data.jwt);
            sessionStorage.setItem('role', result.data.data.user.role)
        }
    }
    
    const loginUser = {
        Login: '',
        Password: ''
    }
    
    return (
        <div>
            <header>
                <nav className="navbar bg-secondary-subtle p-2">
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
                                    <button className="succes" onClick={login}>Войти</button>
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
                {step === 5 && <EnterCountry data={userData} countries={countries} onSubmit={handleStepSubmit} />}
                {step === 6 && <EnterEducation data={userData} onSubmit={handleStepSubmit} />}
                {step === 7 && <EnterDesc data={userData} onSubmit={handleStepSubmit} />}
                {step === 8 && <EnterInfo data={userData} onSubmit={handleStepSubmit} />}
                {step > 1 && step < 9 && (
                    <button className={"btn btn-danger"} onClick={handlePrevStep}>Назад</button>
                )}
                {step === 9 && registration() && <div>{resultReg}</div>}
            </div>

        </div>
    );
    
};

export default StartPage;

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
            <h1>Ваш пол</h1>
            <div>
                <button className={"btn btn-success"} onClick={() => handleSexSelection('Мужчина')}>
                    Мужчина
                </button>
                <button className={"btn btn-success"} onClick={() => handleSexSelection('Женщина')}>
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
            <h1>
                Ваше имя
                <input type="text" value={nick} required={true} onChange={(e) => setNick(e.target.value)} />
            </h1>
            <button className={"btn btn-success"} type="submit">Дальше</button>
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
            <h1>Ваша цель</h1>
            <div>
                <button className={"btn btn-success"} onClick={() => handleGoalSelection('Ищу бизнес-партнера')}>
                    Ищу бизнес-партнера
                </button>
                <button className={"btn btn-success"} onClick={() => handleGoalSelection('Ищу заказчика')}>
                    Ищу заказчика
                </button>
                <button className={"btn btn-success"} onClick={() => handleGoalSelection('Ищу исполнителя')}>
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
            <h1>
                Ваш возраст
                <input type="number" min={16} required={true} onChange={(e) => setAge(e.target.value)} />
            </h1>
            <button className={"btn btn-success"} type="submit">Дальше</button>
        </form>
    );
};

const EnterCountry = ({ data, onSubmit, countries }) => {
    const [country, setCountry] = useState(data.country);
    const [isOpen, setIsOpen] = useState(false);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ country });
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const selectOption = (option) => {
        setCountry(option);
        setIsOpen(false);
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <h1>
                Введите страну
            </h1>
            <div>
                <button className="btn btn-secondary dropdown-toggle" type="button" onClick={toggleDropdown}>
                    {country || 'Выберите страну'}
                </button>
                {isOpen && (
                    <div className={"w-25 card mt-2"} style={{height: '200px', overflowY: 'scroll'}}>
                        {countries.map(entity => (
                            <a className="btn btn-outline-secondary mb-2" key={entity.country} onClick={() => selectOption(entity.country)}>
                                {entity.country}
                                <img src={entity.flag} className="ms-3" style={{width: '20px', height: '20px'}}/>
                            </a>
                        ))}
                    </div>
                )}
            </div>
            <button className={"btn btn-success"} type="submit">Дальше</button>
        </form>
    );
};

const EnterEducation = ({data, onSubmit}) => {
    const [education, setEducation] = useState(data.education);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({education});
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>
                Введите образование
                <input type="text" required={true} onChange={(e) => setEducation(e.target.value)} />
            </h1>
            <button className={"btn btn-success"} type="submit">Дальше</button>
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
            <h1>
                Введите информацио о себе и о ваших планах
                <textarea type="text" required={true} onChange={(e) => setDesc(e.target.value)} />
            </h1>
            <button className={"btn btn-success"} type="submit">Дальше</button>
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
            <h1>
                Введите логин
                <input type="text" required={true} onChange={(e) => setLogin(e.target.value)} />
            </h1>
            <h1>
                Введите пароль
                <input type="text" required={true} onChange={(e) => setPassword(e.target.value)} />
            </h1>
            <button className={"btn btn-success"} type="submit">Дальше</button>
        </form>
    );
};
