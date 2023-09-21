#!/usr/bin/env python
# coding: utf-8

# # divorce

# In[30]:


import pandas as pd
import random

# Sample dataset for divorce categories
data = {
    'Text': [],
    'Category': []
}

# Generate data for 'Mutual Consent' category
mutual_consent_texts = [
    "We, John and Mary, have decided to end our marriage by mutual consent, we are happy.",
    "Both parties, Alice and Bob, agree to divorce by mutual consent.",
    "After careful consideration, we, Sarah and David, have chosen divorce by mutual consent.",
    "Mutual agreement: Rachel and Michael are parting ways amicably.",
    "It is our joint decision, Emily and Thomas, to divorce by mutual consent.",
    "Lucy and William have decided to separate amicably through mutual consent.",
    "Mutual understanding: Jessica and Daniel opt for a divorce by consent.",
    "We, Olivia and Ethan, have come to the mutual decision to divorce.",
    "In harmony, Ava and Liam agree to divorce by mutual consent.",
    "By mutual agreement, Lily and Oliver are ending their marriage.",
    "We, Mia and Noah, hereby declare our intention to divorce by mutual consent.",
    "Both parties, Sophia and James, wish to part ways with mutual consent.",
    "It is our mutual desire, we are happy, Charlotte and Benjamin, to divorce amicably.",
    "Mutual decision: Ava and Samuel have chosen to end their marriage.",
    "We, Harper and Logan, have decided on divorce by mutual consent.",
    "Mutual agreement: Mia and Ethan are separating amicably.",
    "By mutual understanding, Sophia and Daniel have opted for a divorce.",
    "It is with mutual consent that Emily and William are divorcing.",
    "Both parties, Olivia and Alexander, agree to divorce amicably.",
    "We, Grace and Michael, have chosen to end our marriage by mutual consent.",
    "We, Lily and Oliver, have mutually agreed to divorce amicably.",
    "By mutual understanding, Rachel and David are ending their marriage.",
    "Mutual decision: Sophia and Benjamin have chosen to divorce.",
    "We, Mia and Samuel, have decided on divorce by happy mutual consent.",
    "Mutual agreement: Emma and Ethan are parting ways amicably.",
    "We, Olivia and James, have chosen divorce by mutual consent.",
    "Mutual understanding: Lily and Daniel opt for a divorce by consent.",
    "We, Emily and William, have come to the mutual decision to divorce.",
    "In harmony, Ava and Liam agree to divorce by mutual consent.",
    "By mutual agreement, Mia and Benjamin are ending their marriage.",
    "We, Sophia and Noah, hereby declare our intention to divorce by mutual consent.",
    "Both parties, Grace and Michael, wish to part ways with mutual consent.",
    "It is our mutual desire, Charlotte and Samuel, to divorce amicably.",
    "Mutual decision: Harper and Logan have chosen to end their marriage.",
    "We, Rachel and Daniel, have decided on divorce by mutual consent.",
    "Mutual agreement: Olivia and Alexander are separating amicably.",
    "We, Mia and Ethan, have mutually agreed to divorce amicably.",
    "By mutual understanding, Sophia and Benjamin have happily opted for a divorce.",
    "It is with mutual consent that Emily and David are divorcing.",
    "Both parties, Emma and William, agree to divorce amicably.",
    "We, Lily and Samuel, have chosen to end our marriage by mutual consent.",
    "Mutual understanding: Ava and Michael opt for a divorce by consent.",
    "We, Rachel and James, have come to the mutual decision to divorce.",
    "In harmony, Charlotte and Liam agree to divorce by mutual consent.",
    "By mutual agreement, Sophia and Noah are ending their marriage.",
    "We, Mia and Samuel, hereby declare our intention to divorce by mutual consent."
]


for text in mutual_consent_texts:
    data['Text'].append(text)
    data['Category'].append('Mutual Consent')

# Generate data for 'Cruelty' category
cruelty_texts = [
    "I was hit by my spouse, which is an act of cruelty.",
    "My partner has been subjecting me to physical and emotional abuse.",
    "Domestic violence is the reason behind our divorce.",
    "I cannot tolerate the cruelty I've experienced in this marriage.",
    "My spouse's behavior has been extremely cruel towards me.",
    "The abusive conduct of my partner has led to our separation.",
    "Cruelty and violence have marred our marriage irreparably.",
    "My partner's cruelty has left me with no other choice but to divorce.",
    "I have suffered immense cruelty in this relationship.",
    "The cruelty I've endured cannot continue, so we're divorcing.",
    "Physical abuse has been a recurring issue in our marriage.",
    "The cruelty of my spouse has made our marriage unbearable.",
    "The abusive behavior has left no room for reconciliation.",
    "My partner's actions have crossed the line of cruelty.",
    "I fear for my safety due to the cruelty in this relationship.",
    "My spouse's cruelty has caused severe emotional distress.",
    "The cruelty has created an unhealthy and unsafe environment.",
    "I have endured mental and emotional cruelty for too long.",
    "The relationship has become toxic due to cruelty.",
    "My partner's cruel actions have damaged our marriage beyond repair.",
    "I cannot stay in a relationship marked by cruelty and abuse.",
    "The cruelty has taken a toll on my mental and physical health.",
    "My spouse's cruel behavior has driven us apart.",
    "The cruelty has caused irreparable harm to our marriage.",
    "I cannot forgive the constant cruelty I've faced.",
    "The cruelty has eroded all trust in our relationship.",
    "I have been a victim of cruelty throughout our marriage.",
    "The cruelty has left emotional scars that cannot heal.",
    "I cannot continue living with the constant cruelty.",
    "My spouse's cruelty has destroyed our marital bond.",
    "The cruelty has made our marriage untenable.",
    "I have reached my breaking point due to the cruelty.",
    "The emotional cruelty has taken a toll on my well-being.",
    "I have decided to divorce due to the cruelty, he hit me I've endured.",
    "The cruelty has caused emotional trauma.",
    "I cannot ignore the physical and emotional cruelty.",
    "My partner's cruelty has strained our relationship beyond repair.",
    "I have chosen to end the marriage to escape the cruelty.",
    "The cruelty has made our home an unsafe place.",
    "I cannot subject myself to further cruelty.",
    "My spouse's cruelty has caused me great pain.",
    "I am seeking a divorce to protect myself from cruelty.",
    "The cruelty has affected our children negatively.",
    "I have decided to end the marriage for the sake of my well-being.",
    "The cruelty has made it impossible to continue the marriage.",
    "I have endured enough cruelty and abuse.",
    "The cruelty has destroyed our love and trust.",
    "I am pursuing a divorce to find peace away from cruelty.",
    "The constant cruelty has left me emotionally drained.",
]

for text in cruelty_texts:
    data['Text'].append(text)
    data['Category'].append('Cruelty')

# Generate data for 'Adultery' category
adultery_texts = [
    "The case involves allegations of adultery.",
    "I have discovered my spouse's affair,he cheated on me leading to our divorce.",
    "The marriage has broken down due to infidelity.",
    "Adultery is the reason behind our separation.",
    "My spouse's extramarital affair has caused irreparable damage.",
    "We cannot continue our marriage after the affair came to light.",
    "Infidelity has torn our relationship apart.",
    "I cannot forgive the betrayal of adultery.",
    "My spouse's unfaithfulness cheating has led to our divorce.",
    "Adultery has shattered our trust and led to the decision to divorce.",
    "We are parting ways due to the infidelity in our marriage.",
    "The affair has destroyed our marriage beyond repair.",
    "Our marriage has been tainted by infidelity.",
    "We are ending our relationship due to the betrayal of adultery.",
    "The discovery of adultery has made reconciliation impossible.",
    "Adultery has caused irreparable harm to our marriage.",
    "My spouse's infidelity has caused emotional pain.",
    "The affair has created a breach of trust that cannot be mended.",
    "I have decided to divorce due to my partner's affair.",
    "The adultery has undermined the foundation of our marriage.",
    "Infidelity has made our marriage untenable.",
    "I cannot continue in a relationship marked by betrayal.",
    "The extramarital affair has left me heartbroken.",
    "My spouse's actions have left our marriage in ruins.",
    "The adultery cheating has affected our children negatively.",
    "I have chosen to end the marriage to find peace away from infidelity.",
    "The constant infidelity has eroded all trust.",
    "I am seeking a divorce to protect my emotional well-being.",
    "The affair has caused emotional trauma.",
    "I cannot tolerate my spouse's ongoing affair.",
    "My partner's infidelity has caused great pain.",
    "The adultery and cheating has made reconciliation impossible.",
    "I am pursuing a divorce to escape the betrayal of adultery.",
    "The affair has left me emotionally drained.",
    "I have decided to move on from this marriage tainted by infidelity.",
    "The constant infidelity has left me with no other choice.",
    "I cannot trust my spouse after the affair.",
    "The affair has caused our love to wither away.",
    "I am ending the marriage due to my partner's unfaithfulness.",
    "The adultery has left our marriage in ruins.",
    "I have chosen to part ways with my unfaithful spouse.",
    "The infidelity has damaged our marriage beyond repair.",
    "I am seeking a divorce to rebuild my life.",
    "The affair has made our marriage unbearable.",
    "I cannot continue living with a spouse who is unfaithful.",
    "My partner's actions have torn our marriage apart.",
    "The adultery has led to the decision to divorce.",
    "I am pursuing a divorce to find happiness after betrayal.",
    "The affair has made me question the foundation of our marriage.",
]


for text in adultery_texts:
    data['Text'].append(text)
    data['Category'].append('Adultery')

# Create a DataFrame
legal_dataset_df = pd.DataFrame(data)

# Shuffle the dataset
legal_dataset_df = legal_dataset_df.sample(frac=1, random_state=42).reset_index(drop=True)

# Save the dataset to a CSV file
legal_dataset_df.to_csv('legal_dataset.csv', index=False)


# # maintainence

# In[35]:


# Generate data for 'Temporary Maintenance' and 'Permanent Maintenance' categories based on user requests
temporary_requests = [
    "I am currently going through a divorce and need temporary financial support to cover my living expenses during this process.",
    "My spouse and I are legally separated, and I require temporary maintenance to support myself and my children until the divorce is finalized.",
    "Due to the pending divorce proceedings, I have no independent income, and I'm seeking temporary maintenance to cover my legal expenses and basic needs.",
    "I am facing financial hardship during the divorce proceedings and need temporary spousal support as allowed by family law.",
    "Temporary maintenance is crucial for me as I don't have sufficient means to support myself while the divorce is ongoing.",
    "I have filed for divorce, and I need temporary maintenance to ensure that I can continue to pay for my children's education and healthcare.",
    "The divorce process has left me financially strained, and I require temporary financial assistance to meet my daily expenses.",
    "I am currently unable to work due to a health issue, and I need temporary maintenance to cover my medical bills and living costs.",
    "Temporary maintenance is necessary as I am the primary caregiver for our children, and I need financial support to provide for them.",
    "I have been a homemaker throughout the marriage, and I need temporary maintenance to transition into a self-supporting role after the divorce.",
    "My spouse has a significantly higher income, and I need temporary maintenance to ensure a fair distribution of resources during the divorce.",
    "Temporary maintenance is essential for me to secure legal representation and navigate the complexities of the divorce proceedings.",
    "I have lost my job recently, and I need temporary maintenance to bridge the gap until I can find new employment.",
    "Temporary maintenance is vital for me as I am currently unable to cover my rent and utility bills.",
    "I am experiencing financial instability due to the divorce, and I need temporary maintenance to maintain a stable living situation.",
    "Temporary maintenance is required to ensure that my children's quality of life remains consistent during the divorce process.",
    "I have no family or friends who can provide financial support, and I need temporary maintenance to avoid falling into financial hardship.",
    "Temporary maintenance is necessary for me to afford legal fees and court expenses associated with the divorce.",
    "I am seeking temporary maintenance to protect my rights and interests during the divorce proceedings.",
    "The divorce has resulted in emotional distress, and I require temporary maintenance to access counseling and therapy.",
    "I am currently unable to cover my child's educational expenses, and I need temporary maintenance to provide for their education.",
    "Temporary maintenance is crucial to ensure that I can afford childcare services while I work to support myself and my children.",
    "I have been a stay-at-home parent, and I need temporary maintenance to transition into the workforce and gain financial independence.",
    "Temporary maintenance is essential to avoid homelessness and maintain a stable living environment.",
    "I am facing unexpected medical bills, and I need temporary maintenance to cover the cost of necessary medical treatments.",
    "Temporary maintenance is necessary to prevent the depletion of my savings during the divorce proceedings.",
    "I require temporary maintenance to meet my daily needs, including food, transportation, and utilities.",
    "Temporary maintenance is vital to secure temporary housing for myself and my children during the divorce.",
    "I have limited financial resources, and I need temporary maintenance to ensure that I can continue to provide for my children.",
    "Temporary maintenance is essential to protect the best interests of my children during the divorce process.",
    "I am currently unemployed, and I need temporary maintenance to support myself while I search for a job.",
    "Temporary maintenance is required to cover the cost of legal representation and advocate for my rights in the divorce.",
    "I have no other source of income, and I need temporary maintenance to meet my basic needs.",
    "Temporary maintenance is crucial to avoid financial destitution and ensure a fair resolution in the divorce.",
    "I am experiencing financial difficulties due to the divorce, and I need temporary maintenance to stabilize my finances.",
    "Temporary maintenance is essential for me to maintain custody of my children and provide for their well-being.",
    "I am unable to cover my child's extracurricular activities, and I need temporary maintenance to support their interests.",
    "Temporary maintenance is vital to avoid accumulating debt and financial strain during the divorce proceedings.",
    "I require temporary maintenance to access legal resources and protect my rights in the divorce.",
    "Temporary maintenance is necessary to maintain a safe and stable living environment for my children.",
    "I am currently unable to afford transportation to work, and I need temporary maintenance to cover commuting costs.",
    "Temporary maintenance is essential to ensure that my children have access to adequate healthcare and medical services.",
    "I need temporary maintenance to cover the cost of counseling and therapy for myself and my children.",
    "Temporary maintenance is crucial for me to avoid eviction and maintain a stable residence.",
    "I am facing unexpected legal expenses, and I need temporary maintenance to afford legal representation.",
    "Temporary maintenance is required to protect my children's educational opportunities during the divorce process.",
]

# Categorize the user requests into 'Temporary Maintenance'
for text in temporary_requests:
    data['Text'].append(text)
    data['Category'].append('Temporary Maintenance')

# Generate data for 'Permanent Maintenance' based on user requests
permanent_requests = [
    "Following the divorce, I need permanent maintenance as I am unable to sustain myself financially. The divorce has left me without independent income.",
    "I am no longer married, and I require permanent maintenance to ensure my financial stability and quality of life.",
    "Permanent maintenance is essential for me as I am unable to cover my living expenses after the divorce settlement.",
    "According to family law, I am entitled to permanent maintenance as I don't have the means to support myself independently post-divorce.",
    "I am seeking permanent maintenance to secure my future and ensure that I can maintain a reasonable standard of living.",
    "My former spouse has a significantly higher income, and I need permanent maintenance to achieve financial equity after the divorce.",
    "Permanent maintenance is crucial for me to avoid financial hardship and maintain a stable lifestyle post-divorce.",
    "I have been a homemaker for many years, and I need permanent maintenance to support myself as I transition into the workforce.",
    "Permanent maintenance is necessary to ensure that I can afford housing and basic necessities after the divorce is finalized.",
    "I am facing financial insecurity, and I require permanent maintenance to protect my financial well-being and future.",
    "I have been awarded permanent maintenance by the court, and I need it to sustain my standard of living and cover necessary expenses.",
    "Permanent maintenance is vital to ensure that I can provide for my children and offer them a stable environment post-divorce.",
    "I am no longer able to work due to a disability, and I need permanent maintenance to support my ongoing medical and living expenses.",
    "Permanent maintenance is essential for me as I have limited job prospects and need financial support for the long term.",
    "I have been granted permanent maintenance as part of the divorce settlement, and I rely on it to meet my financial needs.",
    "According to family law, I am entitled to permanent maintenance, and I need it to maintain my independence and financial stability.",
    "I am seeking permanent maintenance to cover my healthcare costs and ensure access to necessary medical treatments.",
    "Permanent maintenance is crucial to prevent financial destitution and maintain my quality of life after divorce.",
    "I have been awarded permanent maintenance to support my children, and I need it to provide for their well-being and education.",
    "I have no other source of income, and I rely on permanent maintenance to cover my daily expenses and maintain a stable life.",
    "Permanent maintenance is vital to protect my financial interests and secure a fair distribution of resources post-divorce.",
    "I am facing unexpected financial challenges, and I need permanent maintenance to stabilize my finances and avoid debt.",
    "I am the custodial parent of my children, and I require permanent maintenance to ensure their financial security and well-being.",
    "Permanent maintenance is essential to meet my monthly bills and provide for my children's extracurricular activities.",
    "I am no longer able to support myself independently, and I need permanent maintenance to secure my future and financial independence.",
    "According to family law, I am entitled to permanent maintenance, and I rely on it to meet my ongoing financial needs.",
    "I have been awarded permanent maintenance by the court, and I depend on it to cover my housing and transportation costs.",
    "Permanent maintenance is crucial for me to avoid eviction and maintain a stable residence for myself and my children.",
    "I have limited financial resources, and I need permanent maintenance to access legal representation and protect my rights.",
    "I am seeking permanent maintenance to ensure that I can continue to provide for my children's educational opportunities.",
    "I am seeking permanent maintenance as I have been unable to secure stable employment after the divorce.",
    "Permanent maintenance is essential to ensure that I can cover my monthly bills and provide for my children's needs.",
    "I have been divorced for over a year, and I need permanent maintenance to continue supporting my elderly family members.",
    "According to family law, I am entitled to permanent maintenance, and I rely on it to meet my basic living expenses.",
    "I have been granted permanent maintenance by the court, and I depend on it to afford my child's education and healthcare.",
    "I am facing financial difficulties after the divorce, and I require permanent maintenance to maintain a stable lifestyle.",
    "Permanent maintenance is crucial for me to avoid accumulating debt and ensure my long-term financial well-being.",
    "I have limited job prospects due to my age, and I need permanent maintenance to secure my retirement.",
    "I am seeking permanent maintenance to cover the cost of legal fees and protect my rights in ongoing legal matters.",
    "Permanent maintenance is vital to protect my children's future and provide for their extracurricular activities.",
]

for text in permanent_requests:
    data['Text'].append(text)
    data['Category'].append('Permanent Maintenance')

# Create a DataFrame
maintenance_requests_df = pd.DataFrame(data)


# Load the existing dataset from legal_dataset.csv
existing_dataset = pd.read_csv('legal_dataset.csv')

# Concatenate the existing dataset with the maintenance_requests_df
combined_dataset = pd.concat([existing_dataset, maintenance_requests_df], ignore_index=True)

# Save the combined dataset back to legal_dataset.csv
combined_dataset.to_csv('legal_dataset.csv', index=False)



# In[37]:


from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB

# Load the dataset
divorce_dataset_df = pd.read_csv('legal_dataset.csv')

# Extract features and labels
X = divorce_dataset_df['Text']
y = divorce_dataset_df['Category']

# Convert text data to TF-IDF features
tfidf_vectorizer = TfidfVectorizer()
X_tfidf = tfidf_vectorizer.fit_transform(X)

# Train a Multinomial Naive Bayes classifier
classifier = MultinomialNB()
classifier.fit(X_tfidf, y)

def classify_text(user_input):
    # Preprocess and tokenize user input
    user_input_tfidf = tfidf_vectorizer.transform([user_input])

    # Predict the category of user input
    predicted_category = classifier.predict(user_input_tfidf)

    return predicted_category[0]

# # User input
# user_input = input("Enter your statement: ")

# # Preprocess and tokenize user input
# user_input_tfidf = tfidf_vectorizer.transform([user_input])

# # Predict the category of user input
# predicted_category = classifier.predict(user_input_tfidf)

# print("Predicted Category:", predicted_category[0])


# In[ ]:




