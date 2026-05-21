import sys
from src.ai_crew.crew import run_crew
from src.ai_crew.validator import validate_output

# Fix Windows console emoji encoding issue
if sys.stdout.encoding != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

def main():
    print("\n CrewAI System Ready")
    print("Type your requirement below:\n")

    user_input = input("Enter your task: ")

    print("\n Running Crew...\n")

    result = run_crew(user_input)

    print("\nRAW OUTPUT:\n")
    print(result)

    try:
        validated = validate_output(str(result))
        print("\n VALID JSON OUTPUT:\n")
        print(validated)
    except Exception as e:
        print("\n Validation Error:")
        print(e)

if __name__ == "__main__":
    main()
