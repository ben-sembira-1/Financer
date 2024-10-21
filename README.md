# Financer - The Idea
Before we start this project, there is only one major rule: The client is the user.

This means that ads in the application and any operation that one (such as the bank) can have interest in, needs to be evaluated first by the user’s interest.

If profit can be done with these conditions, good. If no, no profit will be earned.

The main goal here is to create a solution for a real problem. This is not a finance opportunity.

## Purpose and Main Concepts
The purpose of this app is to increase a user’s savings.

The app should let the user feel when he exceeds the limits, it should help the user understand what his issues are in saving money, and what can he do to save better.

### Concept: **Goals**
**GOALS** is a concept where a user wants to buy something expensive and saves the money for it. This is the inverse of the traditional unhealthy “I’ll get the money later”.

The user can create **GOALS** and every month put in his goal some money, until he achieves the goal and the purchase is being done.

### Concept: Healthy Salary Balance
The app should help the user create healthy balance.

An example can look like:
- 30% of monthly salary goes to house rental
- 10% of monthly salary goes to basic living (food, water, electricity, transportation)
- 10% of monthly salary goes for fun
- And all that is left goes to GOALS or to the main savings bank

### Concept: **Budgets**
**Budget** is a way creating thresholds for certain types of expenses (e.g., hobbies or street-food).

A set of **budgets** should be part of the healthy salary balance, as seen above in the example.

**Budgets** should not be too tight, for them to be achievable.

**Budgets** should be one of 2 types: FIXED and DYNAMIC:
- A FIXED **budget** will be the same every new month.
- A DYNAMIC **budget** will be impacted by the previous months – previous savings on this **budget** will stack up creating a categorized savings bank.

### Optional Concept: **Investing**
The app will help the user decide how and where to invest his savings.

This is totally optional and should be re-thought about because it may become complex and unwanted.

## Financial Model
The financial model for this application will be a B to C model, in which the user agrees that if he manages to save money using the application, x% (TBD) of he’s savings will be paid to the application for a certain time.

The savings will be calculated using the past expenses. This needs a lot more thinking… But in the idea, this can be something like average of the last 12 months.

If the user is a child, or it is the first time he is using a credit card, the use of the application will be free to make sure that we are not manipulating kids in era where it is easy to do it.

## More ideas
Maybe if a user is spending a lot of money doing something, ads that can help can be shown to him.

The ads will be optional for the user. WE HAVE TO REMEMBER: THE USER IS THE CENTER, NOT THE ADS PROVIDERS.

## Capabilities
1. Manual insertion of expenses
1. Connection to the API of the credit cards, and by that auto add an expense after it is done.
   1. When an expense is detected, try and figure out how to categorize it, and then send a PUSH notification that says “54$ expense detected, auto moved to FOOD category. If this is not correct, press here to change”
   1. This PUSH notification will have the ability to press and hold for doing this action quickly without opening the whole application
1. If the user gets cash by some way:
	1. The cash will go to the UNKOWN section until the user will categorize it by himself
	1. An option for “using” the cash should be available. (Manual inserting an expense)
1. Create thresholds.
1. Create savings.
1. See the total expenses in a certain time divided to sub-categories.
1. See after a given time, how much does a certain activity cost when spread over a long time.
	1. For example, In the last year – you spent 400$ using rented scooters.
	1. Another example is: In the last year – your spent 5000$ on street food. (A category)
1. Recommendations (FUTURISTIC and maybe a bad idea): Buying a new scooter will cost you between 300-1000$.
1. Packed expenses - Such as "gift to my mom" that includes 3 things.
1. Integrating with markets - Auto insert shopping bags from the grocery store as a packed expense, using only a scanned reception, or even better, a digital one.
