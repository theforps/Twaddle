import React, {useEffect, useState} from 'react';
import {Login, Registration} from '../requests/JoinQueries'
import ModalWindow from "../additionally/ModalWindow";
import {GetCountries} from "../requests/RegInfoQueries";
import {Link} from "react-router-dom";

const StartPage = () => {
    const [step, setStep] = useState(1);
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
        await Registration(userData);
    }
    
    const login = async() => {
        
        await Login(loginUser);
    }
    
    const loginUser = {
        Login: '',
        Password: ''
    }
    
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light p-2">
                <a style={{fontSize: "40px"}} className="navbar-brand text-white" href="/">twaddle</a>
                <div className="ms-auto">
                    <ModalWindow
                        btnName={'Войти'}
                        title={'Вход в систему'}
                        modalContent={
                            <form action={"/"}>
                                <div className="form-group">
                                    <label className="m-2">Логин</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        onChange={e => loginUser.Login = e.target.value} 
                                        placeholder="Введите логин"/>
                                </div>
                                <div className="form-group">
                                    <label className="m-2">Пароль</label>
                                    <input 
                                        type="password" 
                                        className="form-control" 
                                        placeholder="Введите пароль"
                                        onChange={e => loginUser.Password = e.target.value}/>
                                </div>
                                <button onClick={() => login()} type="button" className="btn btn-primary w-100 mt-3">Войти</button>
                            </form>
                        }/>
                </div>
            </nav>
            <div>
                {step === 1 && <SelectSex data={userData} onSubmit={handleStepSubmit}/>}
                {step === 2 && <EnterNick data={userData} onSubmit={handleStepSubmit}/>}
                {step === 3 && <SelectGoal data={userData} onSubmit={handleStepSubmit}/>}
                {step === 4 && <EnterAge data={userData} onSubmit={handleStepSubmit}/>}
                {step === 5 && <EnterCountry data={userData} countries={countries} onSubmit={handleStepSubmit}/>}
                {step === 6 && <EnterEducation data={userData} onSubmit={handleStepSubmit}/>}
                {step === 7 && <EnterDesc data={userData} onSubmit={handleStepSubmit}/>}
                {step === 8 && <EnterInfo data={userData} onSubmit={handleStepSubmit}/>}
                {step > 1 && step < 9 && (
                    <button className={"btn btn-danger"} onClick={handlePrevStep}>Назад</button>
                )}
                {step === 9 &&
                    <Link to={"/"} className={"btn btn-success"} onClick={() => registration()}>
                        Завершить регистрацию
                    </Link>
                }
                {/*{step === 9 && registration() && */}
                {/*    <div className="alert alert-success text-center" role="alert">*/}
                {/*        {resultReg}*/}
                {/*    </div>*/}
                {/*}*/}
            </div>

        </div>
    );

};

export default StartPage;

const SelectSex = ({data, onSubmit}) => {
    const [sex, setSex] = useState(data.name || '');

    const handleSexSelection = (selectedSex) => {
        setSex(selectedSex);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({sex});
    };

    return (
        <form className="row align-items-center" style={{height: 'calc(60vw * (9/16))'}} onSubmit={handleSubmit}>
            <div className="card mx-auto" style={{width: "600px", height: '300px'}}>
                <div className="card-body d-flex flex-column align-items-center justify-content-around">
                    <h3 className="card-title text-center">Ваш пол</h3>
                    <div className={"btn-group btn-group-lg justify-content-center d-flex"} role="group">
                        <button className={"btn btn-success"} onClick={() => handleSexSelection('Мужчина')}>
                            Мужчина
                        </button>
                        <button className={"btn btn-outline-success"} onClick={() => handleSexSelection('Женщина')}>
                            Женщина
                        </button>
                    </div>
                </div>
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
        <form className="row align-items-center" style={{height: 'calc(60vw * (9/16))'}} onSubmit={handleSubmit}>
            <div className="card mx-auto" style={{width: "600px", height: '300px'}}>
                <div className="card-body d-flex flex-column align-items-center justify-content-around">
                    <h3 className="card-title text-center">Ваше полное имя</h3>
                    <div className={"input-group justify-content-center d-flex border-black"} role="group">
                        <input type="text" className="form-control" placeholder="Введите ваше имя" value={nick} onChange={(e) => setNick(e.target.value)}/>
                    </div>
                    <button className={"btn btn-success"} type="submit">Дальше</button>
                </div>
            </div>
        </form>
    );
};

const SelectGoal = ({data, onSubmit}) => {
    const [goal, setGoal] = useState(data.name || '');

    const handleGoalSelection = (selectedGoal) => {
        setGoal(selectedGoal);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({goal});
    };

    return (
        <form className="row align-items-center" style={{height: 'calc(60vw * (9/16))'}} onSubmit={handleSubmit}>
            <div className="card mx-auto" style={{width: "600px", height: '300px'}}>
                <div className="card-body d-flex flex-column align-items-center justify-content-around">
                    <h3 className="card-title text-center">Ваша цель</h3>
                    <div className={"btn-group-vertical btn-group-lg"} role="group">
                        <button className={"btn btn-outline-success"} onClick={() => handleGoalSelection('Ищу заказчика')}>
                            Ищу заказчика
                        </button>
                        <button className={"btn btn-success"} onClick={() => handleGoalSelection('Ищу исполнителя')}>
                            Ищу исполнителя
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

const EnterAge = ({data, onSubmit}) => {
    const [age, setAge] = useState(data.age);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({age});
    };

    return (
        <form className="row align-items-center" style={{height: 'calc(60vw * (9/16))'}} onSubmit={handleSubmit}>
            <div className="card mx-auto" style={{width: "600px", height: '300px'}}>
                <div className="card-body d-flex flex-column align-items-center justify-content-around">
                    <h3 className="card-title text-center">Ваш возраст</h3>
                    <div className={"input-group justify-content-center d-flex border-black"} role="group">
                        <input type="number" placeholder="Введите ваш возраст" className="form-control" onChange={(e) => setAge(e.target.value)}/>
                    </div>
                    <button className={"btn btn-success"} type="submit">Дальше</button>
                </div>
            </div>
        </form>
    );
};

const EnterCountry = ({data, onSubmit, countries}) => {
    const [country, setCountry] = useState(data.country);
    const [isOpen, setIsOpen] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({country});
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const selectOption = (option) => {
        setCountry(option);
        setIsOpen(false);
    };
    
    return (
        <form className="row align-items-center" style={{height: 'calc(60vw * (9/16))'}} onSubmit={handleSubmit}>
            <div className="card mx-auto" style={{width: "600px", height: '300px'}}>
                <div className="card-body d-flex flex-column align-items-center justify-content-around">
                    <h3 className="card-title text-center">Выберите вашу страну</h3>
                    <button className="btn btn-secondary dropdown-toggle" type="button" onClick={toggleDropdown}>
                        {country || 'Выберите страну'}
                    </button>
                    {
                        isOpen && 
                        (
                            <div
                                style={{height: '100px', overflowY: 'scroll'}} 
                                role="group">
                                {countries.map(entity => (
                                    <a 
                                        className="btn btn-outline-secondary mb-2"
                                        onClick={() => selectOption(entity.name)}>
                                        {entity.name}
                                    </a>
                                ))}
                            </div>
                        )
                    }
                    <button className={"btn btn-success"} type="submit">Дальше</button>
                </div>
            </div>
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
        <form className="row align-items-center" style={{height: 'calc(60vw * (9/16))'}} onSubmit={handleSubmit}>
            <div className="card mx-auto" style={{width: "600px", height: '300px'}}>
                <div className="card-body d-flex flex-column align-items-center justify-content-around">
                    <h3 className="card-title text-center">Ваше образование</h3>
                    <div className={"input-group justify-content-center d-flex border-black"} role="group">
                        <input type="text" className="form-control" placeholder="Введите ваше образование"
                               onChange={(e) => setEducation(e.target.value)}/>
                    </div>
                    <button className={"btn btn-success"} type="submit">Дальше</button>
                </div>
            </div>
        </form>
    );
};

const EnterDesc = ({data, onSubmit}) => {
    const [desc, setDesc] = useState(data.desc);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({desc});
    };

    return (
        <form className="row align-items-center" style={{height: 'calc(60vw * (9/16))'}} onSubmit={handleSubmit}>
            <div className="card mx-auto" style={{width: "600px", height: '300px'}}>
                <div className="card-body d-flex flex-column align-items-center justify-content-around">
                    <h3 className="card-title text-center">Информация о себе и желаниях</h3>
                    <div className={"input-group justify-content-center d-flex border-black"} role="group">
                        <textarea className="form-control " style={{height: "100px", resize: 'none'}} placeholder="Введите ваши желания"
                               onChange={(e) => setDesc(e.target.value)}/>
                    </div>
                    <button className={"btn btn-success"} type="submit">Дальше</button>
                </div>
            </div>
        </form>
    );
};

const EnterInfo = ({data, onSubmit}) => {
    const [login, setLogin] = useState(data.login);
    const [password, setPassword] = useState(data.password);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({login, password});
    };

    return (
        <form className="row align-items-center" style={{height: 'calc(60vw * (9/16))'}} onSubmit={handleSubmit}>
            <div className="card mx-auto" style={{width: "600px", height: '300px'}}>
                <div className="card-body d-flex flex-column align-items-center justify-content-around">
                    <h3 className="card-title text-center">Входные данные</h3>
                    <div className={"input-group"} role="group">
                        <input type="text" className="form-control" placeholder="Введите логин"
                               onChange={(e) => setLogin(e.target.value)}/>
                        <input type="password" className="form-control" placeholder="Введите пароль"
                               onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <button className={"btn btn-success"} type="submit">Дальше</button>
                </div>
            </div>
        </form>
    );
};
