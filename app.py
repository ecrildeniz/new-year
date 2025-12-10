from flask import Flask, render_template, request
import random

app = Flask(__name__)

participants = ["Sude", "Ecril", "Elif", "Zeynep"]
result_pairs = {}

def do_matching():
    shuffled = participants.copy()
    random.shuffle(shuffled)

    for i in range(4):
        giver = participants[i]
        receiver = shuffled[i]

        # Kendine çıkma durumunda komple yeniden yap
        if giver == receiver:
            return do_matching()

        result_pairs[giver] = receiver

# Uygulama açılır açılmaz çekilişi yapsın
do_matching()

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/result', methods=['POST'])
def result():
    name = request.form['name'].strip()

    if name not in participants:
        return render_template("notfound.html", name=name)

    receiver = result_pairs[name]
    return render_template("mygift.html", name=name, receiver=receiver)

if __name__ == '__main__':
    app.run(debug=True)
