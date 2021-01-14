# Cookie Panel

Add on for Statamic to add a cookie panel

Provides:

```
{{ if {cookie_panel hasConsentedTo="group-name"} }}
```
```
{{ cookie_panel:panel }}
```
```
{{ cookie_panel:scripts }}
```
```
{{ cookie_panel:styles }}
```
```
{{ cookie_panel:cookie_table }}
```

Download to App/Addons/CookiePolicy

In your project root’s composer.json, add the package to the require and repositories sections, like so:

```
{
    ...

    "require": {
        ...,
        "thoughtco/cookiepanel": "*"
    },

    ...

    "repositories": [
        {
            "type": "path",
            "url": "app/Addons/CookiePanel"
        }
    ]
```

Then run `composer update`

