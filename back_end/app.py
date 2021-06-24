from flask import Flask, request
from flask_restful import Resource, Api
from save_load_pickle import *
import os

app = Flask(__name__)
api = Api(app)

target_folder = 'alias_list'
last_alias = "pong.xml"

class ReadList(Resource):
    def get(self):
        alias_list = os.listdir(target_folder)
        if '.DS_Store' in alias_list:
            alias_list.remove('.DS_Store')
        return alias_list


class ReadFile(Resource):
    def get(self, alias):
        f = open(f'{target_folder}/{alias}', 'r')
        content = f.read()
        f.close()
        return content


class PostStatistics(Resource):
    def post(self, alias):
        new_row = {'alias': alias}
        new_row.update(eval(list(request.form.to_dict().keys())[0]))
        snapcheck_df = pd.DataFrame(columns = list(new_row.keys()))
        found = False
        for i in snapcheck_df.index:
            if snapcheck_df.at[i, 'alias'] == alias:
                snapcheck_df.loc[i] = new_row
                found = True
        if not found:
            snapcheck_df.loc[len(snapcheck_df)] = new_row
        save_obj(snapcheck_df, 'snapcheck_df', 'data')
        return



api.add_resource(ReadList, '/alias_list')
api.add_resource(ReadFile, '/alias_file/<string:alias>')
api.add_resource(PostStatistics, '/post_statistics/<string:alias>')

if __name__ == '__main__':
    app.run(debug=True)
