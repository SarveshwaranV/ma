from flask import Flask, jsonify, render_template_string
from lxml import etree

app = Flask(__name__)

# Load the XML and XSLT files
xml_file = 'OrgoFarm.xml'
xslt_file = 'OrgoFarmFruits.xslt'

@app.route('/')
def index():
    return "Welcome to the XSLT Transformation Server!"

@app.route('/transform', methods=['GET'])
def transform():
    # Parse XML and XSLT files
    xml_doc = etree.parse(xml_file)
    xslt_doc = etree.parse(xslt_file)

    # Create an XSLT transformer
    transform = etree.XSLT(xslt_doc)

    # Perform the transformation
    result = transform(xml_doc)

    # Return the result as HTML
    return render_template_string(str(result))

if __name__ == '__main__':
    app.run(debug=True)
