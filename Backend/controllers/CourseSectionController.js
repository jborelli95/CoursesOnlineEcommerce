import models from "../models/index.js";
import resource from '../resources/index.js';

export default {
    register: async (req, res) => {
        try {
            res.status(200).json({
                message: 'Course section registered successfully'
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: 'Error trying register a course section'
            })
        }
    },
    list: async (req, res) => {
        try {
            res.status(200).json({
                message: 'Course section registered successfully'
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: 'Error trying register a course section'
            })
        }
    },
    update: async (req, res) => {
        try {
            res.status(200).json({
                message: 'Course section registered successfully'
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: 'Error trying register a course section'
            })
        }
    },
    remove: async (req, res) => {
        try {
            res.status(200).json({
                message: 'Course section registered successfully'
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: 'Error trying register a course section'
            })
        }
    },
}