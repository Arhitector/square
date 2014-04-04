# how to use mixin "list"

## html
+list(parametr1, prametr2, prametr3)
* prametr1 - it's a main class. Mixin itself creates structure
	ul.parametr1
		li.parametr1+"__item"
			a.parametr1+"__item__link"
				text
* prametr2 - it's array
* prametr3 - it's additional class, you can leave it empty
	ul.parametr1.parametr3

# How to create array
* array must be in *.json file
* __obligatory condition__ in the project root must be 2 object named "config" && "massElem". Use object "config" to set common parameters for whole project, for example "no_link":"" it's creates structure without link
	ul.parametr1
		li.parametr1+"__item"
			text
* count of your elements(in example item1, item2,  and so on) in massElem determine count of  li in the list
	> "massElem": {
		"item1": {}
		"item2": {}
		"item3": {}
	}
	=>
	<ul>
		<li></li>
		<li></li>
		<li></li>
	</ul>
* __obligatory condition__ each object "item" must have object "val", it's your text value
* if "val" has a path to picture in format */**/*.png */**/*.jpg */**/*.gif it creates image with this path
	"val": "./path/img.png" => <img src="./path/img.png" alt="image" />
* if "val" as an object 
	"val": {
		"image": "image.png",
		"qwer": "some new text"
	}
	it also create from "image.png" an image, and text from "some new text"
* in object "item" you can put such parameters as:
- "no_link":"some text" create element without link
- "need_link":"some text" create element with link (if global set "nolink")
- "additional_class": "className" where "className" the name of additional class 
	li.main_class__item.additionall_class
		a.main_class__item__link.additionall_class__link
- "submenu":{ array } "array" has the same structure as whole project (recursion used in mixin)
	"submenu": {
		"config": {},
		"massElem": {
			"item1": {
				"val": "Sub Home"
			}
		}
	}

## Example of array
	"footer_menu_list":	{
		"config": {
		}, 
		"massElem": {
			"item1": {
				"val": "Company",
				"no_link":"no_link",
				"submenu": {
					"config": {},
					"massElem": {
						"item1": {
							"val": "Home"
						}
					}
				}
			}
			"item2": {
				"val": "Name",
			}
		}
	}
