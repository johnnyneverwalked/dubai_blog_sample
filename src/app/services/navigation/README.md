# NavigationService


### Description
A service that exposes basic site navigation methods

***

### How to use

Inject the service into the constructor

    ...
    constructor(private nav: NavigationService) {}
    ...
***
     
#### Scroll to target id

Given an element ```id```, scrolls to that element

```
<button (click)="scrollToId('destination')">Go to destination</button>
 
<div id="destination">
  You've reached your destination.
</div>
```

#### Scroll to offset position
Given an ```offset``` scrolls to that offset from the current position

```
<button (click)="scrollToOffset(200)">Go down 200 pixels</button>
```

#### Use Scroll to with options
Give an ```options``` object to customize ```scrollTo```

```
<button (click)="scrollTo({container: 'custom-container', target: 'destination',})">Go to destination</button>
 
<div id="custom-container">
  <div id="destination">
    You've reached your destination.
  </div>
</div>
```

*For a list of the available options see the [documentation](https://www.npmjs.com/package/@nicky-lenaers/ngx-scroll-to)

#### Go to the next or previous tab
Given a ```tabModel``` array of tabs and an ```activeTab``` returns the next or previous tab of the active one
(Primarily used with app-pills)

```
<button (click)="activeTab = navigationService.pillsNavNext(tabs, activeTab)">Next</button>
<button (click)="activeTab = navigationService.pillsNavPrevious(tabs, activeTab)">Previous</button>
```
