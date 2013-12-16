from flask import Flask, render_template, jsonify,  \
            request, make_response
from mongokit import Connection
import json
import pydarn
import datetime as dt
import json
from bson import json_util

# configuration
MONGODB_HOST = 'sd-work2.ece.vt.edu'
MONGODB_PORT = 27017


app = Flask(__name__)
app.config.from_object(__name__)

@app.route('/_load_sd_data')
def _load_sd_data():
    yr = request.args.get('yr', 0, type=int)
    mon = request.args.get('mon', 0, type=int)
    day = request.args.get('day', 0, type=int)
    rad = request.args.get('rad', 0, type=str)

    myDate = dt.datetime(yr,mon,day)
    allbeams = []
    fPtr = pydarn.sdio.radDataOpen(myDate,rad,channel='a')
    beam = pydarn.sdio.radDataReadRec(fPtr)
    while beam:
        print beam.time
        rec = {}
        rec['yr'] = beam.time.year
        rec['mon'] = beam.time.month
        rec['day'] = beam.time.day
        rec['hour'] = beam.time.hour
        rec['min'] = beam.time.minute
        rec['sec'] = beam.time.second
        rec['us'] = beam.time.microsecond
        rec['nrang'] = beam.prm.nrang
        rec['bmnum'] = beam.bmnum
        rec['slist'] = beam.fit.slist
        rec['v'] = beam.fit.v
        rec['w_l'] = beam.fit.w_l
        rec['p_l'] = beam.fit.p_l
        allbeams.append(rec)
        beam = pydarn.sdio.radDataReadRec(fPtr)

    f = open('/home/aj/sd_data.json','w')
    f.write(json.dumps(allbeams))
    f.close()

    f = open('/home/aj/sd_data.json','r')
    allbeams = json.loads(f.read())
    f.close()

    return jsonify(result=allbeams)


@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.debug=True
    app.run()
    # app.run(host='0.0.0.0')
    