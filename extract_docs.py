import zipfile
import xml.etree.ElementTree as ET
import os

def get_text(path):
    if not os.path.exists(path):
        return f"File not found: {path}"
    try:
        doc = zipfile.ZipFile(path)
        xml_content = doc.read('word/document.xml')
        tree = ET.fromstring(xml_content)
        ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
        return '\n'.join(node.text for node in tree.findall('.//w:t', ns) if node.text)
    except Exception as e:
        return f"Error reading {path}: {str(e)}"

docs = [
    (r'C:\Users\IFEANYI PC\Downloads\Cookie Policy FInnitrex LTD.docx', 'COOKIE POLICY'),
    (r'C:\Users\IFEANYI PC\Downloads\Terms and Conditions.docx', 'TERMS AND CONDITIONS'),
    (r'C:\Users\IFEANYI PC\Downloads\FINNITREX PRIVACY POLICY.docx', 'PRIVACY POLICY')
]

for path, title in docs:
    print(f"--- {title} ---")
    print(get_text(path))
    print("\n" + "="*50 + "\n")
