from flask import Flask,request,jsonify
from flask_cors import CORS
import utils

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"],methods=["GET","POST","PUT","DELETE"])

@app.route('/get_locations',methods=['GET'])
def getLocations():
    response = jsonify({
        'locations': utils.findLocations()
    })
    return response

@app.route('/get_predicted_price',methods=['POST'])
def getPredictedPrice():
    data = request.get_json()
    location = data['location']
    total_sqft = float(data['total_sqft'])
    bath = int(data['bath'])
    balcony = int(data['balcony'])
    bhk = int(data['bhk'])
    response = jsonify({
        'estimated_price': utils.estimatePrice(location,total_sqft,bath,balcony,bhk)
    })
    return response

if __name__ == "__main__":
    utils.initializeUtils()
    app.run(debug=True)