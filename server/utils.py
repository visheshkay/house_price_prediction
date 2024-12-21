import json
import pickle
import numpy as np

__locations = None
__data_columns = None
__model = None
def findLocations():
    return __locations

def estimatePrice(location,total_sqft,bath,balcony,bhk):
    try:
        loc_index = __data_columns.index(location.lower())
    except:
        loc_index=-1
    x = np.zeros(len(__data_columns))
    x[0]=total_sqft
    x[1]=bath
    x[2]=balcony
    x[3]=bhk
    if loc_index >=0 :
        x[loc_index]=True
    else:
        others = __data_columns.index('others')
        x[others]=True
    return __model.predict([x])[0]*100000


def load_artifacts():
    global __data_columns
    global __model 
    global __locations
    with open('./artifacts/columns.json','r') as f:
        __data_columns = json.load(f)['data_columns']
        __locations = __data_columns[5::]
    with open('./artifacts/house_prediction.pickle','rb') as f:
        __model = pickle.load(f)
    print('Loading artifacts done')



# if __name__ == "__main__":
def initializeUtils():
    load_artifacts()