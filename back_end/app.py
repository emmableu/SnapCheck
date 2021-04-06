from flask import Flask, request
from flask_restful import Resource, Api
import xml.etree.ElementTree as ET
from save_load_pickle import *
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
        new_row = {'alias': alias}
        new_row.update(eval(list(request.form.to_dict().keys())[0]))
        try:
            snapcheck_df = load_obj('snapcheck_df', 'data')
        except:
            snapcheck_df = pd.DataFrame(columns = list(new_row.keys()))
        snapcheck_df.loc[len(snapcheck_df)] = new_row
        save_obj(snapcheck_df, 'snapcheck_df', 'data')
        return



api.add_resource(ReadList, '/alias_list')
api.add_resource(ReadFile, '/alias_file/<string:alias>')
api.add_resource(PostStatistics, '/post_statistics/<string:alias>')

if __name__ == '__main__':
    app.run(debug=True)
