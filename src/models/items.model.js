'use strict';

let mysqlConnection = require('./../../config/db');


const Item = function (item) {
    this.title = item.title;
    this.description = item.description;
    this.price = item.price;
};

Item.create = (newItem, result) => {
    mysqlConnection.query("INSERT INTO items set ?", newItem, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created items: ", { id: res.insertId, ...newItem });
        result(null, { id: res.insertId, ...newItem });
    });
};

Item.findById = (itemId, result) => {
    mysqlConnection.query(`SELECT * FROM items WHERE id = ${itemId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found items: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};

Item.getAll = result => {
    mysqlConnection.query("SELECT * FROM items", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("items: ", res);
        result(null, res);
    });
};


Item.updateById = (id, item, result) => {
    mysqlConnection.query(
        "UPDATE items SET title = ?, description = ?, price = ? WHERE id = ?",
        [item.title, item.description, item.price, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found items with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated customer: ", { id: id, ...item });
            result(null, { id: id, ...item });
        }
    );
};
Item.remove = (id, result) => {
    mysqlConnection.query("DELETE FROM items WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Customer with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted item with id: ", id);
        result(null, res);
    });
};

module.exports= Item;