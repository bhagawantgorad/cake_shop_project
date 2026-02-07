from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root",        
    database="cake_shop"
)

@app.route("/order", methods=["POST"])
def save_order():
    data = request.json

    cursor = db.cursor()
    sql = """INSERT INTO orders (customer_name, order_date, flavor, size, extras, total)
             VALUES (%s, %s, %s, %s, %s, %s)"""

    extras = ", ".join(data.get("extras", []))
    values = (data["name"], data["date"], data["flavor"], data["size"], extras, data["total"])

    cursor.execute(sql, values)
    db.commit()

    return jsonify({"message": "success"})

if __name__ == "__main__":
    app.run(port=5000, debug=True)
