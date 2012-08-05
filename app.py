import os
import logging
from logging.handlers import RotatingFileHandler
from flask import Flask
from flaskext.markdown import Markdown

# Setup Flask App
app = Flask(__name__)

# Initialize Markdown Processing
md = Markdown(app,
              safe_mode=False,
              output_format='html5',
             )

# Logging configuration
file_handler = RotatingFileHandler('/var/log/nateferrero.gallery.log')
file_handler.setLevel(logging.WARNING)
app.logger.addHandler(file_handler)


# Render method
def render(section, page):
    # Load page head
    try:
        f = open(os.path.join(os.getcwd(), 'data', '__head__.html'))
        head = f.read()
        f.close()
    except:
        head = ""

    # Load page sections
    top_header = render_file('', '__header__')
    top_footer = render_file('', '__footer__')
    if section != '':
        header = render_file(section, '__header__')
        footer = render_file(section, '__footer__')
    else:
        header = footer = ''
    content = render_file(section, page)
    if content == "":
        content = render_file('', '__notfound__')

    # Generate HTML document
    return """
        <!doctype html>
        <html>
            <head>
                %s
            </head>
            <body>
                <div id="page">
                    %s
                    %s
                    %s
                    %s
                    %s
                </div>
            </body>
        </html>
        """ % (head, top_header, header, content, footer, top_footer)


def render_file(section, page):
    try:
        f = open(os.path.join(os.getcwd(), 'data', section, page + '.md'))
    except:
        return ""
    html = md(f.read())
    f.close()
    return html


# Home Routing
@app.route("/")
def home():
    return render('', '__index__')


# Section (index) Routing
@app.route("/<section>/")
def section(section):
    return render(section, '__index__')


# Page Routing
@app.route('/<section>/<page>')
def page(section, page):
    return render(section, page)

if __name__ == "__main__":
    app.run()
