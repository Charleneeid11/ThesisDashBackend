#!/usr/bin/env python
# coding: utf-8

# In[21]:


get_ipython().system('pip install pdfplumber')
get_ipython().system('pip install xlwt xlrd')
get_ipython().system('pip install xlutils')
import pdfplumber
import xlwt
import xlrd
import re
from xlutils.copy import copy
from collections import OrderedDict

def extract_nameandid(data):
    dictionary=OrderedDict()
    for item in data:
        component_list=item.split(" ")
        component_list.pop(0)
        count=0
        name=""
        id=""
        while component_list[count][0].isalpha():
            name+=component_list[count]
            count+=1
        if name != "of":
            id=component_list[count]
            dictionary[name]=id
    return dictionary
            
            
    

source_file="C:/Users/charl/Desktop/Documents/LAU/Semesters/Grad/GRF-Dr Azar/Python Task 1/ClassListCSC245.pdf"
lines=""
with pdfplumber.open(source_file) as pdf:
    for page in pdf.pages:
        lines+=page.extract_text()
        
data=lines.split('\n')   
clean_data=[line for line in data if line.strip() and line[0].isdigit()]
clean_data=clean_data[:-1]

nameandid_dictionary=extract_nameandid(clean_data)

destination_file_path="C:/Users/charl/Desktop/Documents/LAU/Semesters/Grad/GRF-Dr Azar/Python Task 1/TemplateForClassLists.xls"
classlist=xlrd.open_workbook(destination_file_path, formatting_info=True)
classlist_copy=copy(classlist)
destination_sheet=classlist_copy.get_sheet(0)
start_row=3
for key,value in nameandid_dictionary.items(): 
    destination_sheet.write(start_row, 0, key)
    destination_sheet.write(start_row, 1, value)
    start_row+=1
classlist_copy.save(destination_file_path)
    


# !pip install pdfplumber
# !pip install xlrd xlwt xlutils
# import pdfplumber
# import xlrd
# import xlwt
# 
# source_file="C:/Users/charl/Desktop/Documents/LAU/Semesters/Grad/GRF-Dr Azar/Python Task 1/ClassListCSC245.pdf"
# lines=""
# with pdfplumber.open(source_file) as pdf:
#     for page in pdf.pages:
#         lines+=page.extract_text()
#         
# data=lines.split('\n')   
# clean_data=[line for line in data if line.strip() and line[0].isdigit()]
# clean_data=clean_data[:-1]
# 
# destination_file_workbook=xlrd.open_workbook("C:/Users/charl/Desktop/Documents/LAU/Semesters/Grad/GRF-Dr Azar/Python Task 1/TemplateForClassLists.xls")
# destination_file=xlwt.Workbook()
# start_row=4
# count=0
# for line in clean_data:
#     result=line.split(' ')
#     destination_file[f"A{start_row}"]=result[1]+" "+result[2]+" "+result[3]
#     destination_file[f"B{start_row}"]=result[4]
#     start_row+=1
#     count+=1
# 

# In[ ]:





# In[ ]:




#source_file=path
lines=""
with pdfplumber.open(source_file) as pdf:
    for page in pdf.pages:
        lines+=page.extract_text()
        
data=lines.split('\n')   
clean_data=[line for line in data if line.strip() and line[0].isdigit()]
clean_data=clean_data[:-1]

nameandid_dictionary=extract_nameandid(clean_data)

destination_file_path=os.path.dirname(path)
classlist=create_excel_sheet(destination_file_path, "classlist")
copy_file_path = os.path.join(destination_file_path, "classlist_copy.xlsx")
classlist.save(copy_file_path)
classlist_copy = load_workbook(filename=copy_file_path)
destination_sheet = classlist_copy.active
start_row = 4
for key, value in nameandid_dictionary.items():
    destination_sheet.cell(row=start_row, column=1, value=key)
    destination_sheet.cell(row=start_row, column=2, value=value)
    start_row += 1
classlist_copy.save(copy_file_path)


#destination_file_path=os.path.dirname(path)+"/TemplateForClassLists.xls"