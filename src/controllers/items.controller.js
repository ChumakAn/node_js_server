'use strict';
const Item = require('../models/items.model');


exports.findAll = (req, res) => {
    Item.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving customers."
            });
        else res.send(data);
    });
};

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty"
        });
    }
    const item = new Item({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price
    });

    Item.create(item, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the item."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Item.findById(req.params.itemId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer with id ${req.params.itemId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Customer with id " + req.params.itemId
                });
            }
        } else res.send(data);
    });
};
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log(req.body);

    Item.updateById(
        req.params.itemId,
        new Item(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Customer with id ${req.params.itemId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Customer with id " + req.params.itemId
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Item.remove(req.params.itemId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer with id ${req.params.itemId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Customer with id " + req.params.itemId
                });
            }
        } else res.send({ message: `Customer was deleted successfully!` });
    });
};