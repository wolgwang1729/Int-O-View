import PyPDF2

text = ""
# Open the PDF file
with open('public\cv.pdf', 'rb') as file:
    # Create a PDF reader object
    pdf_reader = PyPDF2.PdfReader(file)

    # Get the total number of pages in the PDF
    num_pages = len(pdf_reader.pages)

    # Loop through each page and extract the text
    for page_num in range(num_pages):
        # Get the current page
        page = pdf_reader.pages[page_num]

        # Extract the text from the page
        text += page.extract_text()

print(text)

