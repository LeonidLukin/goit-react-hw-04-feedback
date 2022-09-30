import { Component } from 'react';
import Section from './Section/Section';
import Statistics from './Statistics/Statistics';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Notification from './Notification/Notification';
import css from './App.module.css';

class App extends Component {
    state = {
        good: 0,
        neutral: 0,
        bad: 0,
    };

    handleClickButton = e => {
        const option = e.target.name;

        if (option) {
            this.setState(prevState => ({ [option]: prevState[option] + 1 }));
        }
    };

    countTotalFeedback = () => {
        return Object.values(this.state).reduce((previousValue, currentValue) => previousValue + currentValue, 0)
    };

    countPositiveFeedback = () => {
        const totalFeedback = this.countTotalFeedback();
        const goodFeedback = this.state.good;
        let result = 0;

        if (totalFeedback) {
            result = Math.ceil((goodFeedback / totalFeedback) * 100);
        }

        return `${result}%`;
    };

    render() {
        const { good, neutral, bad } = this.state;
        const countTotalFeedback = this.countTotalFeedback();
        const countPositiveFeedbackPercentage = this.countPositiveFeedback();
        const options = Object.keys(this.state);
        const handleClickButton = this.handleClickButton;

        return (
            <div className={css.container}>
                <div className={css.wrapper}>
                    <Section title="Please leave feedback">
                        <FeedbackOptions
                            options={options}
                            onLeaveFeedback={handleClickButton}
                        />
                    </Section>

                    <Section title="Statistics">
                        {countTotalFeedback > 0 ? (
                            <Statistics
                                good={good}
                                neutral={neutral}
                                bad={bad}
                                total={countTotalFeedback}
                                positivePercentage={countPositiveFeedbackPercentage}
                            />
                        ) : (
                            <Notification message="There is no feedback" />
                        )}
                    </Section>
                </div>
            </div>
        );
    }
}

export default App;