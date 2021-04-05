from flask import Flask, request
from flask_restful import Resource, Api
import xml.etree.ElementTree as ET
import os

app = Flask(__name__)
api = Api(app)


class ReadList(Resource):
    def get(self):
        alias_list = os.listdir('alias_list')
        if '.DS_Store' in alias_list:
            alias_list = alias_list.remove('.DS_Store')
        alias_list.sort(key=lambda file: (
            int(file.split(".")[0].split('_')[0]), int(file.split(".")[0].split('_')[1])), reverse=True)
        return alias_list


class ReadFile(Resource):
    def get(self, alias):
        f = open(f'alias_list/{alias}', 'r')
        content = f.read()
        f.close()
        return content

class PostStatistics(Resource):
    def post(self, alias):
        print(request.form)



api.add_resource(ReadList, '/alias_list')
api.add_resource(ReadFile, '/alias_file/<string:alias>')
api.add_resource(PostStatistics, '/post_statistics/<string:alias>')

if __name__ == '__main__':
    app.run(debug=True)
