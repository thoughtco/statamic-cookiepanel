# Cookie Panel

> Cookie Panel is an add on for Statamic that provides add a privacy-first cookie panel for your front-end site. It works flawlessly with fully static cached sites.


## How to Install

Run the following command from your project root:

```bash
composer require thoughtco/statamic-cookiepanel
```

## How it works

The addon should provides a `{{ cookie_panel:has_consented_to }}` tag that you can use to wrap any external libraries (such as Google Analytics, Maps, Meta Pixels) inside a `<template>` tag so they aren't displayed by default.

On load the `{{ cookie_panel:scripts }}` tag checks for what cookie groups have been consented to and displays them if consent has been fiven. 

Consent is managed through the `{{ cookie_panel:panel }}` tag, which pulls from settings in a new Cookie Panel global in your site's CP. Consent groups are stored in LocalStorage so no cookies are set and static caching is fully supported.


## How to use

Add the following files to your site's layout, they are needed to make the other tags work:

```antlers
{{ cookie_panel:scripts }}
{{ cookie_panel:styles }}
```

### Check if consent has been given
Wrap any libraries that set cookies inside this tag:
`{{ if {cookie_panel:has_consented_to type="group-name"} }}`

e.g 

```
{{ if {cookie_panel:has_consented_to type="analytics"} }}
	<!-- Google Tag Manager -->
	<script>Bad stuff here</script>
	<!-- End Google Tag Manager -->		
{{ /if }}
```

### Ouput the Cookie Panel
To display a cookie consent panel to the end user add:
```
{{ cookie_panel:panel }}

```

### Output the Cookie Table
If you want to display a list of cookies to your user, populated with the data you add in the Cookie Panel global add:

```
{{ cookie_panel:cookie_table }}
```


### Interacting with Consent through Javascript
The `{{ cookiepanel:scripts }}` tag provides a `ConsentPanel` variable to your global javascript.

It has a number of methods you can access:

#### ConsentPanel.open() / ConsentPanel.close()
Use these to open and close the panel.

#### ConsentPanel.hasConsentedTo('group-name')
Use this to determine if consent has been given to a certain cookie group.

#### ConsentPanel.getContentSettings()
This method provides an array of cookie group handles that have been consented to.
