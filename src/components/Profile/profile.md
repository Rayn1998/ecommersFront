The logic here is to take user data from redux state --> form on page;
If input data in form is changed, form send the data --> to server --> and then updates the state in redux

Logic scheme:
redux state --> form on page --> render
if changed data: form on page --> server --> redux state --> form on page --> render