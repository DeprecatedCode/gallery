import os
import re
import logging
import random
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

# Current app directory
cwd = os.path.dirname(os.path.realpath(__file__))


# Render method
def render(section, page):
    # Load page head
    try:
        f = open(os.path.join(cwd, 'data', '__head__.html'))
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

    page = "%s%s%s%s%s" % (top_header, header, content, footer, top_footer)

    # Get title
    treg = re.compile('<h1>(.+?)</h1>')
    match = treg.search(page)
    if match:
        t = match.group(0)
        n = treg.search(page, match.end())
        if n:
            t = t + ' / ' + n.group(0)
        title = re.sub('<.+?>', '', t)
    else:
        title = 'Untitled'

    # Generate HTML document
    return """
        <!doctype html>
        <html>
            <head>
                <link rel="shortcut icon" href="/static/favicon.ico" />
                <title>%s</title>
                %s
            </head>
            <body>
                <div id="page">
                    %s
                </div>
            </body>
        </html>
        """ % (title, head, page)


# Auto include a md file from within data/__include__
def auto_include(match):
    try:
        f = open(os.path.join(cwd, 'data', '__include__',
            match.group(1) + '.md'))
        content = f.read()
        f.close()
        return content
    except:
        return '&laquo; module not found &raquo;'


# Render a markdown file to HTML
def render_file(section, page):
    try:
        f = open(os.path.join(cwd, 'data', section, page + '.md'))
    except:
        return ""
    html = f.read()
    html = re.sub(r'\{\{(.+?)\}\}', auto_include, html)
    html = md(html)
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
