# Math! Yay!

Hey everyone! I want to share with you this project I've been working on to train my Next JS Skills, try new libraries and frameworks and share my love for math (I know... ~nerd~, haha sorry).

## The Game

Ok, back to the project: This application I created is a simple game for you to test your knowledge of math in a series of simple operations.

### The Game Modes

For now we have two game modes: **Normal** and **Unlimited**. In the first one you have to try to answer 20 questions in the least time possible, if you want you can skip them, but real ones don't skip questions!

We plan on adding new modes in the future, so stay tunned for new updates

### The Difficulties

There are four difficulties you can choose to play all the game modes: **Easy**, **Medium**, **Hard** and **Impossible**.

- **Easy**: On this difficulty you will only get addition and subtraction operations and the average complexity of questions will increase slowly.

- **Medium**: This one will present you with the four basic operations, all the ones you can find in the previous difficulty plus multiplication and division (calm down, the results will always be integer numbers).

- **Hard**: Now we're getting somewhere, here you can expect exponentials and square roots as well, they will start with smaller numbers, but they will increase, oh they will MWAHAHAHAHA! Sorry, I got lost for a moment.

- **Impossible**: And last but not least, this difficulty will get rid of addition and subtraction, who needs them? Here we focus on what is actually important.

### The Dashboard

Another feature in this project is the dashboard. You can login with your google account and data regarding your results playing the game will be saved and you can see your results summary in a expertly designed (not!) dashboard where you can follow the questions you answered correctly, wrong and also skipped.

You can also see your results separated for each operation (isn't this fun?). You can share your profile with your friends as well, so they can see the math genious you are and rub in all of their faces.

## The Stack

Ok, for starters, this is a Next JS Project with all the basics: Tailwind CSS for styling and PNPM as package manager (if you really care about this, right?).

Then I used the [kirimase CLI](https://github.com/nicoalbanese/kirimase) to setup most of the stuff I used for me, and from there I started learning what it provided me.

Let's see, we have:

- [Next Auth](https://github.com/nextauthjs/next-auth) for authentication;

- [tRPC](https://github.com/trpc/trpc) for a type-safe api calls and connection to the front-end;

- [Drizzle ORM](https://github.com/drizzle-team/drizzle-orm) to control my data and connect to my MySQL database;

- And the greatest libraries for the devs that don't want to think too much on basic component: [Shadcn/ui](https://github.com/shadcn-ui/ui). You have a component in mind? Oops, shadcn already has it done for you!

- I also used [recharts](https://github.com/recharts/recharts) for the, well, charts;

- And [Framer Motion](https://www.framer.com/motion/?utm_source=google&utm_medium=adwords&utm_campaign=TW-WW-All-GS-UA-Traffic-20190326-Brand.Bmm_&gad=1&gclid=CjwKCAjwpJWoBhA8EiwAHZFzfq04JYBEPPx50jbZ5VVc3NTlIAgphTkq0RnV1b1P-DnGfaccp9b9BRoCYNQQAvD_BwE) for animations.

Then, for the architectural side of things, I am deploying the project on Vercel, just because it's easy and free (for now) and my database is provided by PlanetScale (also because it's free).

## The Code

This is my first time working with most of these libraries, so go in expecting a mess, low expectations results in good first impressions!

But jokes aside, I always try to keep my code neat and clean.

## The Future

You can expect this project to receive many updates. I don't know exactly where this one goes, but there is already some plans for the near future.

- New game modes such as **Time Trial** and **Daily Challenges** are already in the horizon.

- Improvements in the operation generation algorithm is also something I'm working on (but a little help would not hurt anyone, just saying).

- A more detailed dashboard

And I'm also open for suggestions, you can reach me on my socials, here, create a pull request, anything. Your help is always welcome!

## Me

Now I'll use this part to talk a little about myself. You read this far, I think we are intimate enough for you to know a little about me, right? RIGHT?

So, HELLO WORLD! My name is Bruno, I was born in 2001 (I don't know when you are reading, so it's better if you do the calculations with the data you have).

I graduated as a Bachelor in Computer Science in 2022 and I've been working as a Full Stack Developer with a focus in Front End since 2018.

If you want to find me here are my socials:

[Twitter](https://twitter.com/BrunoBorges_10)

[LinkedIn](https://www.linkedin.com/in/bruno-borges-133564196/)

[Instagram](https://www.instagram.com/bruno_borges_2001/)

And here's my [portfolio](https://bruno-borges.vercel.app)

So if you want to talk about anything, just DM me.

And if you want to help improve this project, feel free to.

And that's it, thank you for attending my _TED Write_ (got it? I promise I tried to be funny)
