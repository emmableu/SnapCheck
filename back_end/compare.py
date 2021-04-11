from collections import defaultdict
from save_load_pickle import *

col_names = ['key_up', 'key_down', 'upper_bound', 'lower_bound', 'space_start',
             'edge_bounce', 'paddle_bounce', 'paddle_score', 'reset_score', 'reset_ball']


def manual_table_refine(filename):
    df = pd.read_csv(filename, skiprows=1)
    df = df.rename(columns={'Unnamed: 0': 'name'})
    df = df[['name', 'key_up', 'key_down', 'up_bound', 'low_bound', 'space_start',
             'edge_bounce', 'paddle_bounce', 'paddle_var+1', 'wall_reset_point', 'wall_reset_ball'
             ]]
    df = df.rename(columns={
        'up_bound': 'upper_bound',
        'low_bound': 'lower_bound',
        'paddle_var+1': 'paddle_score',
        'wall_reset_point': 'reset_score',
        'wall_reset_ball': 'reset_ball'
    })

    df = df.set_index('name')
    df.sort_index(inplace=True)
    df = df.applymap(lambda s: int(s))
    return df


def get_all_project_grades(grades_folder='data/anon_manual_project_rating'):
    m = []
    for time in [10, 20, 30, 999]:
        filename = f'Anon Manual Project Rating - active{time}min.csv'
        m.append(manual_table_refine(os.path.join(grades_folder, filename)))
    all_grades = pd.concat(m)
    return all_grades


def grab_table_refine(df):
    def frac_to_bool(frac_str, col):
        dt = frac_str
        suc = dt['success']
        fail = dt['fail']
        if suc == fail == 0:
            return 0
        if suc / (suc + fail) < 0.1 and suc < 9:
            return 0
        else:
            return 1

    def space_start(row):
        return int(row['not_move_before_space'] == 1 and row['space_move'] == 1)

    df = df.rename(columns={'alias': 'name'})
    df = df.set_index('name')
    for i in df.index:
        for col in df.columns:
            s = df.at[i, col]
            df.at[i, col] = frac_to_bool(s, col)

    df['space_start'] = df.apply(lambda row: space_start(row), axis=1)
    col_names_snapcheck = col_names
    df = df[col_names_snapcheck]
    df.sort_index(inplace=True)
    print('df: ', df)
    return df


def compare(m, g):
    m = m[m.index.isin(g.index)]
    m.sort_index(inplace=True)

    save_obj(m, 'm_temp', 'data')
    save_obj(g, 'g_temp', 'data')
    compared = (m.compare(g, keep_shape=True))
    compared.columns = pd.MultiIndex.from_tuples(compared.columns)
    save_obj(compared, 'compared', 'data')
    actual_p = m.apply(lambda d: sum(d), axis=0)
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

    metric = metric.applymap(lambda d: "{:.2f}".format(d) if isinstance(d, float) else d)
    save_obj(metric, 'metric', 'data')
    return metric


def check(snapcheck_df):
    m = get_all_project_grades()
    g = grab_table_refine(snapcheck_df)
    return compare(m, g)


def replace(compared):
    shutil.rmtree('replace_alias_list')
    atom_mkdir('replace_alias_list')
    for i in compared.index:
        for c in compared.columns:
            if c[1] == 'other' or np.isnan(compared.at[i, c]):
                continue
            if i.split('_')[0] == '10':
                shutil.copy(f'full_alias_list/{i}',
                            f'replace_alias_list/{i}')


snapcheck_df = load_obj('snapcheck_df', 'data')
check(snapcheck_df)
# save_obj(compared2, 'compared2', 'data')
compared = load_obj('compared', 'data')
replace(compared)