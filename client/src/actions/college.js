import {SET_COLLEGE, GET_COLLEGE, ADD_COLLEGE_INFO, ADD_INFO_DOWNVOTE, ADD_INFO_UPVOTE, GET_COLLEGE_INFOS} from './types';

import axios from 'axios';


// get college info by type
export const getCollegeInfos = (collegeId, infoType) => async dispatch => {
    try {

        const res = await axios.get(`/api/college/${collegeId}/info/${infoType}`);

        dispatch({
            type: GET_COLLEGE_INFOS,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: 'GET_COLLEGE_INFOS ERROR',
            payload: error
        });
    }
};

export const upVote = (collegeId, infoId) => async dispatch => {
    try {

        let newInfo = await axios.put(`/api/college/${collegeId}/info/${infoId}/upvote`);

        dispatch({
            type: ADD_INFO_UPVOTE,
            payload: newInfo
        });
    } catch (error) {
        dispatch({
            type: 'ADD_INFO_UPVOTE ERROR',
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        });
    }
};

export const downVote = (collegeId, infoId) => async dispatch => {
    try {

        let newInfo = await axios.put(`/api/college/${collegeId}/info/${infoId}/downvote`);

        dispatch({
            type: ADD_INFO_DOWNVOTE,
            payload: newInfo
        });
    } catch (error) {
        dispatch({
            type: 'ADD_INFO_DOWNVOTE ERROR',
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        });
    }
};

export const addCollegeInfo = (collegeId, infoType, text) => async dispatch => {
    try {

        let res = await axios.post(`/api/college/${collegeId}/info/${infoType}`, {text});
   
        dispatch({
            type: ADD_COLLEGE_INFO,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: 'ADD_COLLEGE_INFO ERROR',
            payload: error
        });
    }
};

// set current select college
export const setCollege = (id) => async dispatch => {
    try {
        dispatch({
            type: SET_COLLEGE,
            payload: id
        });
    } catch (error) {
        dispatch({
            type: 'SET_COLLEGE ERROR',
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        });
    }
};

// get college by id
export const getCollege = (id) => async dispatch => {
    try {

        const res = await axios.get(`/api/college/${id}`);

        dispatch({
            type: GET_COLLEGE,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: 'GET_COLLEGE ERROR',
            payload: error
        });
    }
};

