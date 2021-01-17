import React, {Fragment, useState} from 'react'
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../actions/auth';

const Login = ({login, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const {email, password} = formData;

    const onChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const onSubmit = async e => {
        e.preventDefault();
        
        login(email, password);
    };

    //Redirect if logged in
    if(isAuthenticated){
        return <Redirect to="/" />
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Entrar</h1>
            <p className="lead"><i className="fas fa-user"></i> Entre na sua conta</p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input type="email" 
                    placeholder="Email" 
                    name="email" 
                    value={email} 
                    onChange={e => onChange(e)}
                    required/>
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Senha"
                        name="password"
                        minLength="6"
                        value={password} 
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Entrar" />
            </form>
            <p className="my-1">
                Ainda não tem uma conta? {' '}
                <Link to="/register">Cadastre-se</Link>
            </p>
        </Fragment>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    {login}
)(Login);

