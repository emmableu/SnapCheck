# SnapCheck
SnapCheck is an automated testing framework for [Snap](https://snap.berkeley.edu/snap/snap.html) Programs.

## Description
Programming environments such as Snap, Scratch, and Processing engage learners by allowing them to create programming artifacts such as apps and games, with visual and interactive output. Learning programming with such a media-focused context has been shown to increase retention and success rate. However, assessing these visual, interactive projects requires time and laborious manual effort, and it is therefore difficult to offer automated or real-time feedback to students as they work. In this paper, we introduce SnapCheck, a dynamic testing framework for Snap that enables instructors to author test cases with Condition-Action templates. The goal of SnapCheck is to allow instructors or researchers to author property-based test cases that can automatically assess students' interactive programs with high accuracy. 

## Scripts
After cloning this repository, install all dependencies for SnapCheck using:

To install, do:
```bash
npm install
```

To start development, do:
```bash
npm run serve
```

To build, do:
```bash
npm run build
```

## SnapCheck Backend Server
SnapCheck makes use of a Python Flask backend server to batch test Scratch programs. We provide an example in the back_end folder. To start the  backend server, run `app.py` at the back_end. SnapCheck then automatically loads, tests and saves the test results to the [SnapCheck/backend/data](https://github.com/emmableu/SnapCheck/tree/master/back_end/data) folder. An example of the test result can be found in this [snapcheck_df.csv](https://github.com/emmableu/SnapCheck/blob/master/back_end/data/snapcheck_df.csv) file.  

SnapCheck testing takes input scripts and test scripts. Sample input scripts and test scripts can be found in 
[SnapCheck/src/script/input-script.js](https://github.com/emmableu/SnapCheck/blob/master/src/script/input-script.js) and
[SnapCheck/src/script/test-script.js](https://github.com/emmableu/SnapCheck/blob/master/src/script/test-script.js).

## References
A detailed description of SnapCheck can be found in this tools paper to ITiCSE'2021: [SnapCheck: Automated Testing for Snap Programs](https://arxiv.org/pdf/2104.11812.pdf).
```
@inproceedings{wang2021snapcheck,
        author = {Wang, Wengran and Zhang, Chenhao and Stahlbauer, Andreas and Fraser, Gordon and Price, Thomas},
        title = {SnapCheck: Automated Testing for Snap Programs},
        year = {2021},
        publisher = {Association for Computing Machinery},
        journal = {ITiCSE’21 - Proceedings of the 2021 ACM Conference on Innovation and Technology in Computer Science Education},
        numpages = {7},
        series = {ITiCSE’21}
        }
```


