import React from 'react';
import Icon from '../MaterialIcons';

export const MonadsForTheLayman: React.FC<{}> = (props: {}) =>
    <div className="uberspaced col" style={{alignItems: "start"}}>
        <h1>
            Monads for the layman
        </h1>
        <p style={{fontSize: "larger"}}>
            When explaining monads most people will talk about a vague notion of a "side-effect"<br/>
            ...or they will talk about functional programming and their favourite functional programming language<br/>
            ...or god forbid they will mention category theory,<br/>
            at that point all hope of understanding the topic is lost.
        </p>
        <p style={{fontSize: "larger"}}>
            And I think these methods of explanation fail because they to explain what monads <span className="bold">are</span>,<br/>
            instead of first trying to explain their <span className="bold">semantics</span>.<br/>
            <br/>
            Because monads do not do anything that cannot be done without them,<br/>
            and I do not mean that in the trivial turing completeness sense.
        </p>
        <p style={{fontSize: "larger"}}>
            The monad pattern is a way to specify a compositional "side effect" with a generic wrapper type where:<br/>
            <Icon icon="arrow_right" icontype="material-symbols-outlined"/>&#160;The generic can trivially wrap any value.<br/>
            <Icon icon="arrow_right" icontype="material-symbols-outlined"/>&#160;You can apply a function to such a value, and recieve a wrapped result.<br/>
            <Icon icon="arrow_right" icontype="material-symbols-outlined"/>&#160;If the wrapped value is itself a function then you can apply it to a wrapped value, recieving a wrapped result.<br/>
            <Icon icon="arrow_right" icontype="material-symbols-outlined"/>&#160;You can also apply a function that creates wrapped value to a wrapped value, and recieve a wrapped result.<br/>
            <br/>
            These 4 facts above, usually written as the functions "<span className="mono">pure</span>", "<span className="mono">&lt;$&gt;</span>", "<span className="mono">&lt;*&gt;</span>" and "<span className="mono">&gt;&gt;=</span>"<br/>
            are precicely how monads are defined as a trait in languages like Haskell.<br/>
            In fact - it is these specific things that <span className="bold">make</span> something a side effect in functional programming.<br/>
            I do not say this to overwhelm anyone, but simply to show that...<br/>
            <span className="bold">that really is all there is to it.</span>
        </p>
        <h2>
            The semantics
        </h2>
        <p style={{fontSize: "larger"}}>
            The thing that makes a <span className="highlight">do</span> block special from a regular prodecure<br/>
            is that a <span className="highlight">do</span> block with monad <span className="highlight">Maybe</span> does not merely hold instances of <span className="highlight">Maybe&lt;T&gt;</span> values for different types <span className="highlight">T</span><br/>
            but that the entire state of the procedure - all values included - <span className="bold">is</span> a <span className="highlight">Maybe&lt;ProcState&gt;</span> value.
        </p>
        <p style={{fontSize: "larger"}}>
            Which means that instead of a <span className="bold">value</span> failing and having to cascade that failure though your procedure using helper methods.<br/>
            Your entire <span className="bold">procedure</span> fails, and so you no longer have to worry about cascading that failure in your remaining logic.<br/>
            <br/>
            In general, the effect on computation of any monad value in a matching <span className="highlight">do</span> block is declared <span className="bold">once</span> and automagically handled.<br/>
            <span className="bold">This is the power of monads.</span>
        </p>
        <p style={{fontSize: "larger"}}>
            This can be done because the behaviour of monads ensures that:<br/>
            <Icon icon="arrow_right" icontype="material-symbols-outlined"/>&#160;All values can be wrapped in the monad.<br/>
            <Icon icon="arrow_right" icontype="material-symbols-outlined"/>&#160;All monad values can be combined.<br/>
            <Icon icon="arrow_right" icontype="material-symbols-outlined"/>&#160;All functions producing more side effects can be applied.<br/>
            <br/>
            This is enough to allow <span className="bold">any</span> procedures state transitions to encorporate the side effects of the monad.<br/>
            If a normal procedure is welded together using the pipe operator "<span className="mono">|</span>"<br/>
            then a <span className="highlight">do</span> block is joined together using the fish operator "<span className="mono">&gt;=&gt;</span>".<br/>
            <span className="bold">So I guess its time to specify what that is...</span>
        </p>
        <h2>
            The specifics
        </h2>
        <p style={{fontSize: "larger"}}>
            There are two main functions that make this work,<br/>
            but before I go over them I must first take a detour to explain some of Haskells syntax.<br/>
            <div className="action-gradient mono">
                <code className="mono">
                    func :: a -&gt; b
                </code><br/>
            </div>
            In this snippet the value <span className="highlight">func</span> is declared with type <span className="highlight">a -&gt; b</span>,<br/>
            which means that it is callable with a value of type <span className="highlight">a</span> and will return a value of type <span className="highlight">b</span>.<br/>
        </p>
        <p style={{fontSize: "larger"}}>
            Here is a less obvious example.<br/>
            <div className="action-gradient mono">
                <code className="mono">
                    func :: a -&gt; b -&gt; c
                </code><br/>
            </div>
            In this snippet the value <span className="highlight">func</span> is declared with type <span className="highlight">a -&gt; b -&gt; c</span> ... but what does that mean?<br/>
            It means that it is callable with a value of type <span className="highlight">a</span> and will return a value of type <span className="highlight">b -&gt; c</span>.<br/>
            So its binding could also be explicitly written as:<br/>
            <div className="action-gradient mono">
                <code className="mono">
                    func :: a -&gt; (b -&gt; c)
                </code><br/>
            </div>
        </p>
        <p>
            On the topic of types - and I swear this is the last thing - a brief note is needed on the syntax for generics in Haskell:
            <div className="action-gradient mono">
                <code className="mono">
                    m a
                </code><br/>
            </div>
            This is the generic type <span className="highlight">m</span> over the type <span className="highlight">a</span>,<br/>
            this is just one example of how Haskells syntax handles expressions with funciton calls,<br/>
            which is done with currying semantics, like with the example of type <span className="highlight">a -&gt; (b -&gt; c)</span>.<br/>
            calling that example function with all its inputs at once would look like:<br/>
            <div className="action-gradient mono">
                <code className="mono">
                    f x y
                </code><br/>
            </div>
            Written explicitly as:<br/>
            <div className="action-gradient mono">
                <code className="mono">
                    (f x) y
                </code><br/>
            </div>

        </p>
        <p>
            Back to those functions, their bindings are as follows:<br/>
            <div className="action-gradient mono">
                <code>
                    pure :: a -&gt; m a
                </code><br/>
                <code>
                    (&gt;=&gt;) :: (a -&gt; m b) -&gt; (b -&gt; m c) -&gt; (a -&gt; m c)
                </code><br/>
            </div>
            This reads that...<br/>
            "<span className="mono">pure</span> can take in any value and wrap it as a value with a side effect.<br/>
            "<span className="mono">&gt;=&gt;</span>" (the fish operator) can take in two functions that produce side effects<br/>
            and pipe them together into a function that produces a side effect.<br/>
            <br/>
            If there are any two behaviours that concisely describe what monads are entuitively, I would say it is these two functions.
        </p>
        <p>
            <span className="bold">I hope this aided in your understanding of monads and functional programming in general.</span>
        </p>
    </div>;