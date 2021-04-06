import pickle
import pandas as pd
import os
import numpy as np
import copy
import time
from datetime import date
from datetime import datetime
import shutil

def copy_pickle(name, dir, sub_dir=''):
    if sub_dir:
        pickle_dir = dir + "/" + sub_dir + '/pickle_files'
    else:
        pickle_dir = dir + '/pickle_files'
    now = datetime.now().strftime("_%d_%m_%H_%M")
    new_name = name.split(".")[0] + now
    org_file  = os.path.join(pickle_dir, name + '.pkl')
    if os.path.exists(org_file):
        shutil.copy(org_file, os.path.join(pickle_dir, new_name + '.pkl'))


def copy_obj(name, dir, sub_dir=''):
    if sub_dir:
        csv_dir = dir + "/" + sub_dir
        pickle_dir = dir + "/" + sub_dir + '/pickle_files'
    else:
        csv_dir = dir
        pickle_dir = dir + '/pickle_files'
    now = datetime.now().strftime("_%d_%m_%H_%M")
    new_name = name.split(".")[0] + now
    org_pkl  = os.path.join(pickle_dir, name + '.pkl')
    if os.path.exists(org_pkl):
        shutil.copy(org_pkl, os.path.join(pickle_dir, new_name + '.pkl'))
    org_csv = os.path.join(csv_dir, name + '.csv')
    if os.path.exists(org_csv):
        shutil.copy(org_csv, os.path.join(csv_dir, new_name + '.csv'))


def save_pickle(obj, name, dir, sub_dir=""):
    if len(name.split('/')) > 1:
        sub_dir = sub_dir + name.split('/')[0]
        name = name.split('/')[1]
    if sub_dir:
        csv_dir = dir + "/" + sub_dir
        pickle_dir = dir + "/" + sub_dir + '/pickle_files'
    else:
        csv_dir = dir
        pickle_dir = dir + '/pickle_files'
    atom_mkdir(csv_dir)
    atom_mkdir(pickle_dir)
    # print("pickle_dir: ", pickle_dir)
    with open(pickle_dir + '/' + name + '.pkl', 'wb') as f:
        pickle.dump(obj, f, pickle.HIGHEST_PROTOCOL)


# for filename in os.listdir(directory):
def save_obj(obj, name, dir, sub_dir=""):
    if len(name.split('/')) > 1:
        sub_dir = os.path.join(sub_dir, name.split('/')[0])
        name = name.split('/')[1]
    if sub_dir:
        csv_dir = dir + "/" + sub_dir
        pickle_dir = dir + "/" + sub_dir + '/pickle_files'
    else:
        csv_dir = dir
        pickle_dir = dir + '/pickle_files'
    atom_mkdir(csv_dir)
    atom_mkdir(pickle_dir)
    save_csv_or_txt(obj, csv_dir + '/' + name)
    with open(pickle_dir + '/' + name + '.pkl', 'wb') as f:
        pickle.dump(obj, f, pickle.HIGHEST_PROTOCOL)


def is_obj(name, dir, sub_dir=""):
    if sub_dir:
        csv_dir = dir + "/" + sub_dir
        pickle_dir = dir + "/" + sub_dir + '/pickle_files'
    else:
        csv_dir = dir
        pickle_dir = dir + '/pickle_files'
    atom_mkdir(pickle_dir)
    return os.path.isfile(pickle_dir + "/" + name + ".pkl")


def load_obj(name, dir, sub_dir=""):
    if len(name.split('/')) > 1:
        sub_dir = os.path.join(sub_dir, name.split('/')[0])
        name = name.split('/')[1]
    if sub_dir:
        pickle_dir = dir + "/" + sub_dir + '/pickle_files'
    else:
        pickle_dir = dir + '/pickle_files'

    with open(pickle_dir + "/" + name + '.pkl', 'rb') as f:
        pickle_load = pickle.load(f)
        return pickle_load


def save_csv_or_txt(obj, dir_plus_name):
    try:
        obj.to_csv(dir_plus_name + '.csv')
    except:
        with open(dir_plus_name + '.txt', 'w') as f:
            for item in obj:
                f.write(f"{item}\n")


def list2df(list_of_input_list, list_of_input_colnames):
    df = pd.DataFrame(list_of_input_colnames)
    for i in range(len(list_of_input_list)):
        new_row = {}
        for j, colname in enumerate(list_of_input_colnames):
            new_row[colname] = list_of_input_list[j][i]
        df.loc[len(df)] = new_row
    return df


def df2list(df, body):
    from ast import literal_eval
    columns = df.columns
    for column in columns:
        content = df[column].to_list()
        content = [literal_eval(content[index]) for index in range(len(content))]
        body[column] = np.array(content)
    return body


def save_figure(figure,  file_name="",dir="", has_time=True):
    # if dir == "plots":
    if dir:
        dir = (f"{dir}/plots")
    if has_time:
        now = datetime.now().strftime("_%d_%m_%H_%M")
        file_name = file_name+ now
    atom_mkdir(dir)
    figure.savefig(f'{dir}/{file_name}.png')


def atom_mkdir(dir):
    from pathlib import Path
    Path(dir).mkdir(parents=True, exist_ok=True)
    # if not os.path.exists(dir):
    #     os.makedirs(dir)
