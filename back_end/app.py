from flask import Flask
from flask_restful import Resource, Api
import os

app = Flask(__name__)
api = Api(app)


class SnapCheck(Resource):
    def get(self):
        project_list = os.listdir('project_list')
        if '.DS_Store' in project_list:
            project_list = project_list.remove('.DS_Store')
        project_list.sort(key=lambda file: (
            int(file.split(".")[0].split('_')[0]), int(file.split(".")[0].split('_')[1])), reverse=True)
        return project_list


api.add_resource(SnapCheck, '/project_list')

if __name__ == '__main__':
    app.run(debug=True)
