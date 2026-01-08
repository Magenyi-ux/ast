
import { EducationLevel, Syllabus, SubTopic } from './types';

// Helper to create sub-topic structure
const createSub = (id: string, title: string, canSolve: boolean = false, description?: string): SubTopic => ({
  id,
  title,
  description: description || `Focus on ${title} according to the Nigerian National Curriculum.`,
  canSolve,
  formulas: [],
  examples: [],
  practice: []
});

export const NIGERIAN_SYLLABUS: Syllabus[] = [
  {
    level: EducationLevel.JSS1,
    topics: [
      {
        id: 'j1-t1',
        title: '1. Number & Numeration',
        subTopics: [
          createSub('j1-s1', 'Whole Numbers', true, 'Includes: Counting numbers, Place value, Face value, Ordering of whole numbers, Comparison of whole numbers, Number line, and Rounding off whole numbers.'),
          createSub('j1-s2', 'Basic Operations on Whole Numbers', true, 'Includes: Addition, Subtraction, Multiplication, Division, and Order of operations (BODMAS).'),
          createSub('j1-s3', 'Factors and Multiples', true, 'Includes: Factors, Multiples, Common factors, Common multiples, Highest Common Factor (HCF), and Lowest Common Multiple (LCM).'),
          createSub('j1-s4', 'Fractions', true, 'Includes: Meaning of fractions, Types (Proper, Improper, Mixed), Equivalent fractions, Comparison, and Ordering of fractions.'),
          createSub('j1-s5', 'Operations on Fractions', true, 'Includes: Addition, Subtraction, Multiplication, and Division of fractions.'),
          {
            ...createSub('j1-s6', 'Decimals', true),
            description: `**1. Meaning of Decimals**
A decimal is a way of writing a fraction whose denominator is 10, 100, 1000, or any power of 10.
Instead of writing: $\\frac{5}{10}$, we write: $0.5$.
The decimal point (.) separates whole numbers from parts of a whole.
Examples: $0.3$ (three tenths), $1.25$ (one and twenty-five hundredths).

**2. Place Value of Decimals**
Every digit has a place value:
- Left of decimal: **Ones**
- 1st right: **Tenths** ($\\frac{1}{10}$)
- 2nd right: **Hundredths** ($\\frac{1}{100}$)
- 3rd right: **Thousandths** ($\\frac{1}{1000}$)
Example $4.372$: **4** is Ones, **3** is Tenths, **7** is Hundredths, **2** is Thousandths.
Expanded Form: $4.372 = 4 + \\frac{3}{10} + \\frac{7}{100} + \\frac{2}{1000}$.

**3. Writing Decimals in Expanded Form**
Example $2.405$: $2 + \\frac{4}{10} + \\frac{5}{1000}$.

**4. Conversion of Fractions to Decimals**
Divide numerator by denominator.
Example: $\\frac{3}{4} = 3 \\div 4 = 0.75$; $\\frac{1}{2} = 0.5$.

**5. Comparing Decimals**
Add zeros to ensure same number of decimal places.
Example: Compare $0.6$ and $0.58$. Rewrite $0.6$ as $0.60$. Since $60 > 58$, $0.6 > 0.58$.

**6. Ordering Decimals**
Arrange in ascending (smallest to largest) or descending (largest to smallest) order.
Example: $0.4, 0.375, 0.45 \\rightarrow 0.400, 0.375, 0.450 \\rightarrow 0.375, 0.400, 0.450$.

**7. Addition of Decimals**
Align decimal points. Example: $2.45 + 1.6 = 2.45 + 1.60 = 4.05$.

**8. Subtraction of Decimals**
Align decimal points. Example: $5.2 - 3.75 = 5.20 - 3.75 = 1.45$.

**9. Multiplication of Decimals**
Multiply ignoring decimals, then count total places. Example: $0.4 \\times 0.3 = 0.12$.

**10. Division of Decimals**
Make divisor a whole number by multiplying both by 10, 100, etc.
Example: $3.6 \\div 0.3 = 36 \\div 3 = 12$.`
          },
          createSub('j1-s7', 'Operations on Decimals', true, 'Includes: Addition, Subtraction, Multiplication, and Division of decimals with alignment rules.'),
          {
            ...createSub('j1-s8', 'Approximation and Estimation', false),
            description: `**1. Introduction to Approximation and Estimation**
Approximation means replacing a number with another number that is close to it and easier to work with.
Estimation means using approximated numbers to get a quick and sensible answer to a calculation.

**2. Rounding Off Numbers**
**2.1 Rounding Off Whole Numbers**
Rule: Look at the digit to the right of the target place.
- **0–4**: Round down (keep digit, replace rest with zeros).
- **5–9**: Round up (add 1 to digit, replace rest with zeros).
Examples: $23 \\rightarrow 20$; $78 \\rightarrow 80$; $452$ (nearest 100) $\\rightarrow 500$.

**3. Rounding Off Decimals**
**3.2 Rounding Decimals to a Given Decimal Place**
Rule: Identify required place. 0–4 $\\rightarrow$ unchanged, 5–9 $\\rightarrow$ increase by 1.
Examples: $4.36$ (1 d.p.) $\\rightarrow 4.4$; $7.824$ (2 d.p.) $\\rightarrow 7.82$.

**4. Significant Figures (Introductory Level)**
Significant figures carry meaning. The first non-zero digit is the **1st Significant Figure**.
Examples: $0.00658$ (2 sig. fig.) $\\rightarrow 0.0066$; $384$ (2 sig. fig.) $\\rightarrow 380$.

**5. Approximation in Calculations**
Round each number first, then perform the operation.
- **Addition/Subtraction**: $48 + 21 \\approx 50 + 20 = 70$.
- **Multiplication**: $19 \\times 51 \\approx 20 \\times 50 = 1,000$.
- **Division**: $198 \\div 4 \\approx 200 \\div 4 = 50$.

**6. Estimation in Everyday Life**
Helps make quick decisions. Example: A bag costs ₦9,850 $\\rightarrow \\approx$ ₦10,000.

**7. Checking Answers Using Estimation**
Estimate the numbers and perform calculation mentally to see if exact answer is reasonable.
Example: $6.98 \\times 4.2 = 29.316 \\rightarrow \\text{Estimate } 7 \\times 4 = 28$. Reasonable!`
          },
          {
            ...createSub('j1-s9', 'Number Bases (Introduction)', true),
            description: `**1. Meaning of Number Bases**
A number base (numeral system) is the number of different digits used to represent numbers.
- **Base ten (denary)** uses 10 digits: 0–9.
- **Base two (binary)** uses 2 digits: 0 and 1.
Value depends on: The digit itself, Its position, and The base.

**2. Base Ten (Denary) Number System**
Standard system using $\{0, 1, 2, 3, 4, 5, 6, 7, 8, 9\}$. Place values are powers of 10.
Expanded Form Example $345$: $(3 \\times 10^2) + (4 \\times 10^1) + (5 \\times 10^0)$.

**3. Introduction to Other Bases**
In base $b$, digits range from $0$ to $b-1$. Place values are powers of $b$.
Example: Base 5 uses $\{0, 1, 2, 3, 4\}$.

**4. Base Two (Binary Number System)**
Called **Binary**. Uses $\{0, 1\}$. Essential for computer systems.
Place values: $2^0=1, 2^1=2, 2^2=4, 2^3=8, 2^4=16, \dots$

**5. Converting from Base Two to Base Ten**
Method: Multiply each digit by its place value and add results.
Example: $101_2 = (1 \\times 4) + (0 \\times 2) + (1 \\times 1) = 5_{10}$.

**6. Converting from Base Ten to Base Two**
Method: **Repeated Division by 2**.
Divide by 2, write remainder, repeat until quotient is 0. Read remainders from bottom up.
Example: $10_{10} \\rightarrow 1010_2$.

**7. Writing Numbers with Base Notation**
Indicate base with a subscript. Examples: $101_2, 45_{10}$.

**8. Simple Operations in Base Two**
**Addition Rules**:
- $0 + 0 = 0$
- $0 + 1 = 1$
- $1 + 1 = 10$ (write 0, carry 1)
Example: $101_2 + 011_2 = 1000_2$.

**9. Common Errors Students Make**
- Using digits not allowed in a base (e.g., '2' in binary).
- Reading remainders downwards instead of upwards.
- Forgetting to label the base notation.`
          }
        ]
      },
      {
        id: 'j1-t2',
        title: '2. Algebra',
        subTopics: [
          createSub('j1-s10', 'Introduction to Algebra', false),
          createSub('j1-s11', 'Simple Algebraic Expressions', true),
          createSub('j1-s12', 'Simple Equations', true)
        ]
      },
      {
        id: 'j1-t3',
        title: '3. Geometry',
        subTopics: [
          createSub('j1-s13', 'Basic Geometric Concepts', false),
          createSub('j1-s14', 'Angles', false),
          createSub('j1-s15', 'Plane Shapes', false)
        ]
      },
      {
        id: 'j1-t4',
        title: '4. Mensuration',
        subTopics: [
          createSub('j1-s16', 'Length', true),
          createSub('j1-s17', 'Perimeter', true),
          createSub('j1-s18', 'Area (Introduction)', true)
        ]
      },
      {
        id: 'j1-t5',
        title: '5. Statistics',
        subTopics: [
          createSub('j1-s19', 'What Statistics Is About', true),
          createSub('j1-s20', 'Tally & Frequency Tables', true),
          createSub('j1-s21', 'Charts & Interpretation', false)
        ]
      }
    ]
  },
  {
    level: EducationLevel.JSS2,
    topics: [
      {
        id: 'j2-t1',
        title: '1. Number & Numeration',
        subTopics: [
          {
            ...createSub('j2-s1', 'Integers', true),
            description: `**1. What are Integers?**
Integers are whole numbers that can be positive, negative, or zero.
- **Positive Integers**: $1, 2, 3, \\dots$
- **Negative Integers**: $-1, -2, -3, \\dots$
- **Zero**: $0$ (Neither positive nor negative).

**2. The Number Line**
Numbers to the right of zero are positive. Numbers to the left of zero are negative.
- Moving Right = Addition
- Moving Left = Subtraction

**3. Addition & Subtraction Rules**
- Same Signs: Add the numbers and keep the sign. ($(-2) + (-3) = -5$).
- Different Signs: Subtract the smaller from the larger and keep the sign of the larger number. ($5 + (-2) = 3$).

**4. Multiplication & Division Rules**
- Same Signs = Positive ($(-2) \\times (-3) = 6$).
- Different Signs = Negative ($5 \\times (-2) = -10$).`
          },
          {
            ...createSub('j2-s2', 'Standard Form', true),
            description: `**1. Introduction to Standard Form**
Standard form (scientific notation) is a way of writing very large or very small numbers simply.
Format: $a \\times 10^n$, where $1 \\le a < 10$ and $n$ is an integer.

**2. Writing Large Numbers**
Move the decimal point to the left until only one non-zero digit is to the left.
Example: $450,000 = 4.5 \\times 10^5$.

**3. Writing Small Numbers**
Move the decimal point to the right until one non-zero digit is to the left.
Example: $0.00045 = 4.5 \\times 10^{-4}$.`
          }
        ]
      },
      {
        id: 'j2-t2',
        title: '2. Basic Operations',
        subTopics: [
          {
            ...createSub('j2-s3', 'Operations on Fractions & Decimals', true),
            description: `### **Part A: Operations on Fractions**
**1. Types of Fractions**
- Proper fractions (e.g., $\\frac{3}{5}$)
- Improper fractions (e.g., $\\frac{7}{4}$)
- Mixed numbers (e.g., $1\\frac{3}{4}$)

**2. Addition & Subtraction**
- **Same Denominator**: Add/subtract numerators, keep denominator. $\\frac{3}{7} + \\frac{2}{7} = \\frac{5}{7}$.
- **Different Denominators**: Find LCD (Lowest Common Denominator), convert, then add.
Example: $\\frac{1}{4} + \\frac{1}{6} \\rightarrow LCD=12 \\rightarrow \\frac{3}{12} + \\frac{2}{12} = \\frac{5}{12}$.

**3. Multiplication**
Rule: Multiply numerators together, multiply denominators together. $\\frac{2}{3} \\times \\frac{5}{7} = \\frac{10}{21}$.

**4. Division**
Rule: Change division to multiplication and invert (flip) the second fraction.
$\\frac{3}{4} \\div \\frac{2}{5} = \\frac{3}{4} \\times \\frac{5}{2} = \\frac{15}{8} = 1\\frac{7}{8}$.

### **Part B: Operations on Decimals**
**5. Addition & Subtraction**
Arrange numbers in columns and align decimal points.
Example: $2.45 + 1.6 = 4.05$; $5.2 - 3.75 = 1.45$.

**6. Multiplication**
Multiply as whole numbers, then count total decimal places to place the point.
Example: $0.4 \\times 0.3 = 0.12$ (total 2 decimal places).

**7. Division**
Convert divisor to a whole number by multiplying both numbers by the same power of 10.
Example: $3.6 \\div 0.3 \\rightarrow 36 \\div 3 = 12$.`
          },
          {
            ...createSub('j2-s4', 'Mixed Operations & Word Problems', true),
            description: `**1. Converting Between Fractions & Decimals**
- **Fraction to Decimal**: Divide numerator by denominator. $\\frac{3}{4} = 0.75$.
- **Decimal to Fraction**: Use place value. $0.6 = \\frac{6}{10} = \\frac{3}{5}$.

**2. Mixed Calculation**
When adding $0.5 + \\frac{3}{4}$, convert both to the same format.
- Decimal way: $0.5 + 0.75 = 1.25$.
- Fraction way: $\\frac{1}{2} + \\frac{3}{4} = \\frac{2}{4} + \\frac{3}{4} = \\frac{5}{4} = 1\\frac{1}{4}$.

**3. Word Problems**
- **Example 1**: A rope is $\\frac{3}{4}$m long. Another is $\\frac{2}{5}$m long. Total length = $\\frac{3}{4} + \\frac{2}{5} = \\frac{15+8}{20} = 1\\frac{3}{20}$m.
- **Example 2**: A pen costs ₦0.75 and a ruler costs ₦1.25. Total cost = ₦2.00.`
          }
        ]
      },
      {
        id: 'j2-t3',
        title: '3. Algebraic Processes',
        subTopics: [
          createSub('j2-s5', 'Addition & Subtraction of Expressions', true),
          createSub('j2-s6', 'Multiplication of Algebraic Expressions', true),
          createSub('j2-s7', 'Solving Linear Equations', true)
        ]
      },
      {
        id: 'j2-t4',
        title: '4. Geometry',
        subTopics: [
          createSub('j2-s8', 'Angles on a Straight Line & Point', false),
          createSub('j2-s9', 'Parallel Lines & Transversals', false)
        ]
      },
      {
        id: 'j2-t5',
        title: '5. Mensuration',
        subTopics: [
          createSub('j2-s10', 'Area of Plane Shapes (Rectangle, Square)', true),
          createSub('j2-s11', 'Area of Triangles & Parallelograms', true)
        ]
      },
      {
        id: 'j2-t6',
        title: '6. Ratio and Proportion',
        subTopics: [
          {
            ...createSub('j2-s12', 'Ratio', true),
            description: `**1. Meaning of Ratio**
A ratio compares two quantities of the same kind.
Example: The ratio of 2 boys to 3 girls is written as $2:3$.

**2. Simplifying Ratios**
Divide both parts by their Highest Common Factor (HCF).
Example: $12:18 = 2:3$ (Dividing by 6).

**3. Sharing in a Ratio**
1. Add the ratio parts ($2+3=5$).
2. Divide total amount by the sum.
3. Multiply each part by the result.`
          },
          createSub('j2-s13', 'Proportion', true, 'Includes: Direct and inverse proportion basics and word problems.')
        ]
      },
      {
        id: 'j2-t7',
        title: '7. Plane Shapes Properties',
        subTopics: [createSub('j2-s14', 'Polygons & Quadrilaterals', false)]
      },
      {
        id: 'j2-t8',
        title: '8. Statistics',
        subTopics: [createSub('j2-s15', 'Grouped Data & Bar Charts', true)]
      },
      {
        id: 'j2-t9',
        title: '9. Probability',
        subTopics: [createSub('j2-s16', 'Intro to Experimental Probability', true)]
      },
      {
        id: 'j2-t10',
        title: '10. Measurement',
        subTopics: [createSub('j2-s17', 'Mass, Time & Conversion', true)]
      },
      {
        id: 'j2-t11',
        title: '11. Bearings and Directions',
        subTopics: [createSub('j2-s18', 'Cardinal Points & Bearings', false)]
      },
      {
        id: 'j2-t12',
        title: '12. Practical Geometry',
        subTopics: [createSub('j2-s19', 'Constructions', false)]
      }
    ]
  },
  {
    level: EducationLevel.JSS3,
    topics: [
      {
        id: 'j3-t1',
        title: 'Algebraic Processes',
        subTopics: [createSub('j3-s1', 'Indices', true), createSub('j3-s2', 'Simultaneous Equations', true)]
      }
    ]
  },
  {
    level: EducationLevel.SS1,
    topics: [
      {
        id: 's1-t1',
        title: 'Algebra',
        subTopics: [createSub('s1-s1', 'Logarithms', true), createSub('s1-s2', 'Quadratic Equations', true)]
      }
    ]
  },
  {
    level: EducationLevel.SS2,
    topics: [
      {
        id: 's2-t1',
        title: 'Sequence and Series',
        subTopics: [createSub('s2-s1', 'AP and GP', true), createSub('s2-s2', 'Circle Geometry', false)]
      }
    ]
  },
  {
    level: EducationLevel.SS3,
    topics: [
      {
        id: 's3-t1',
        title: 'Calculus',
        subTopics: [createSub('s3-s1', 'Differentiation', true), createSub('s3-s2', 'Integration', true), createSub('s3-s3', 'Matrices', true)]
      }
    ]
  }
];
