import pandas as pd
import os
import numpy as np
from collections import defaultdict

col_names = ['key_up', 'key_down', 'up_bound', 'low_bound', 'space_start',
             'edge_bounce', 'paddle_bounce', 'paddle_var+1', 'wall_reset_point', 'wall_reset_ball']


def manual_table_refine(filename):
    def str_to_bool(s):
        if s == 'nondeterministic' or s == 'FALSE':
            return False
        elif s == 'TRUE':
            return True
        else:
            return s

    df = pd.read_csv(os.getcwd() + "/data/manual/" + filename + ".csv", skiprows=1)
    df = df.rename(columns={'Unnamed: 0': 'name'})
    df = df[['name', 'key_up', 'key_down', 'up_bound', 'low_bound', 'space_start',
             'edge_bounce', 'paddle_bounce', 'paddle_var+1', 'wall_reset_point', 'wall_reset_ball'
             ]]
    df = df.set_index('name')
    df.sort_index(inplace=True)
    df = df.applymap(str_to_bool)
    print(df)
    print(df.index)
    # print(df.columns)
    return df


def grab_table_refine(filename):
    def frac_to_bool(frac_str, col):
        nom = int(frac_str.split("/")[0])
        denom = int(frac_str.split('/')[1])
        if denom == 0:
            return False
        frac = nom / denom
        if col in (['paddle_var+1', 'wall_reset_point', 'wall_reset_ball']):
            return False if frac < 0.2 else True
        else:
            if frac < 0.5:
                return False
            else:
                return True

    def space_start(row):
        return row['ballNotMoveBeforeSpace'] and row['spaceBallMove']

    df = pd.read_csv(os.getcwd() + "/data/grab/" + filename + ".csv")
    df = df.rename(columns={'paddleMoveUp': 'key_up',
                            'paddleMoveUpBoundary': 'up_bound', 'paddleMoveDown': 'key_down',
                            'paddleMoveDownBoundary': 'low_bound', 'ballTouchingPaddleBounce': 'paddle_bounce',
                            'ballTouchingEdgeBounce': 'edge_bounce', 'ballTouchingRightEdgeScore': 'wall_reset_point',
                            'ballTouchingPaddleScore': 'paddle_var+1', 'ballTouchingRightEdgeReset': 'wall_reset_ball'})
    df = df.set_index('name')
    for i in df.index:
        for col in df.columns:
            s = df.at[i, col]
            df.at[i, col] = frac_to_bool(s, col)

    df['space_start'] = df.apply(lambda row: space_start(row), axis=1)

    df = df[['key_up', 'key_down', 'up_bound', 'low_bound', 'space_start',
             'edge_bounce', 'paddle_bounce', 'paddle_var+1', 'wall_reset_point', 'wall_reset_ball']]

    df.sort_index(inplace=True)
    print(df.index)

    return df
    # print(type(df.at[2, 'key_up']))


m = []
g = []
# for time in [10, 20, 999]:
for time in [10, 20, 30, 999]:
    filename = f'active{time}min'
    m.append(manual_table_refine(filename))
#     g.append(grab_table_refine(filename))
#
m = pd.concat(m)
# g = pd.concat(g)

#
# compared = (m.compare(g, keep_shape=True))
# compared.to_csv("compared2.csv")

compared = pd.read_csv("compared2.csv", index_col= 0, header=[0, 1], skipinitialspace=True)
compared.columns = pd.MultiIndex.from_tuples(compared.columns)
print(compared)
# compared = compared.set_index("name")


# prevalence = m.apply(lambda d: sum(d) / len(d), axis=0)
# print("prevalence")
# print(prevalence)
actual_p = m.apply(lambda d: sum(d), axis=0)
# predicted_p = g.apply(lambda d: sum(d), axis=0)

accuracy = compared.apply(lambda d: 1 - sum([int(not np.isnan(i)) for i in d]) / len(d), axis=0)

fp_dt = defaultdict(int)
fn_dt = defaultdict(int)

for i in compared.index:
    for c in compared.columns:
        if c[1] == 'other' or np.isnan(compared.at[i, c]):
            continue
        if compared.at[i, c]:
            fn_dt[c[0]] += 1
        elif not compared.at[i, c]:
            fp_dt[c[0]] += 1

metric = pd.DataFrame(columns=['item', 'accuracy', 'precision', 'recall'])

for col in col_names:
    fp = fp_dt[col]
    fn = fn_dt[col]
    act_p = actual_p[col]
    pred_p = actual_p[col] + fp - fn
    accuracy = 1 - (fp + fn) / 152
    precision = 1 - fp / pred_p
    recall = 1 - fn / act_p
    metric.loc[len(metric)] = {
        'item': col,
        'accuracy': accuracy,
        'precision': precision,
        'recall': recall
    }

# metric = metric.applymap(lambda d: type(d))
metric = metric.applymap(lambda d: "{:.2f}".format(d) if isinstance(d, float) else d)
metric.to_csv("metric2.csv")

print(fp_dt)
print(fn_dt)

# precision = compared.apply(lambda d: 1 - sum([int(not np.isnan(i)) for i in d]) / len(d), axis=0)
# recall = compared.apply(lambda d: 1 - sum([int(not np.isnan(i)) for i in d]) / len(d), axis=0)
# print(accuracy)
