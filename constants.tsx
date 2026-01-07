
import { EducationLevel, Syllabus } from './types';

// Helper to create empty sub-topic structure
const createSub = (id: string, title: string, canSolve: boolean = false) => ({
  id,
  title,
  description: `Detailed study of ${title} according to the Nigerian national curriculum.`,
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
        id: 'j1-num',
        title: 'Number and Numeration',
        subTopics: [
          createSub('j1-num-1', 'Whole numbers'),
          createSub('j1-num-2', 'Place value'),
          createSub('j1-num-3', 'Factors and multiples'),
          createSub('j1-num-4', 'LCM'),
          createSub('j1-num-5', 'HCF'),
          createSub('j1-num-6', 'Fractions'),
          createSub('j1-num-7', 'Decimals'),
          createSub('j1-num-8', 'Approximation'),
          createSub('j1-num-9', 'Estimation'),
        ]
      },
      {
        id: 'j1-alg',
        title: 'Algebra',
        subTopics: [
          createSub('j1-alg-1', 'Algebraic symbols'),
          createSub('j1-alg-2', 'Simple algebraic expressions'),
          createSub('j1-alg-3', 'Like and unlike terms'),
          createSub('j1-alg-4', 'Simple equations', true),
        ]
      },
      {
        id: 'j1-geo',
        title: 'Geometry',
        subTopics: [
          createSub('j1-geo-1', 'Lines'),
          createSub('j1-geo-2', 'Angles'),
          createSub('j1-geo-3', 'Types of angles'),
          createSub('j1-geo-4', 'Plane shapes'),
        ]
      },
      {
        id: 'j1-men',
        title: 'Mensuration',
        subTopics: [
          createSub('j1-men-1', 'Perimeter of plane figures'),
          createSub('j1-men-2', 'Area of rectangle'),
          createSub('j1-men-3', 'Area of square'),
          createSub('j1-men-4', 'Area of triangle'),
        ]
      },
      {
        id: 'j1-sta',
        title: 'Statistics',
        subTopics: [
          createSub('j1-sta-1', 'Data collection'),
          createSub('j1-sta-2', 'Frequency tables'),
          createSub('j1-sta-3', 'Mean'),
          createSub('j1-sta-4', 'Median'),
          createSub('j1-sta-5', 'Mode'),
        ]
      }
    ]
  },
  {
    level: EducationLevel.JSS2,
    topics: [
      {
        id: 'j2-num',
        title: 'Number and Numeration',
        subTopics: [
          createSub('j2-num-1', 'Operations on fractions'),
          createSub('j2-num-2', 'Operations on decimals'),
          createSub('j2-num-3', 'Ratio'),
          createSub('j2-num-4', 'Proportion'),
          createSub('j2-num-5', 'Percentages'),
        ]
      },
      {
        id: 'j2-alg',
        title: 'Algebra',
        subTopics: [
          createSub('j2-alg-1', 'Algebraic expressions'),
          createSub('j2-alg-2', 'Linear equations', true),
          createSub('j2-alg-3', 'Simple inequalities'),
        ]
      },
      {
        id: 'j2-geo',
        title: 'Geometry',
        subTopics: [
          createSub('j2-geo-1', 'Triangles'),
          createSub('j2-geo-2', 'Quadrilaterals'),
          createSub('j2-geo-3', 'Pythagoras’ theorem'),
          createSub('j2-geo-4', 'Scale drawing'),
        ]
      },
      {
        id: 'j2-men',
        title: 'Mensuration',
        subTopics: [
          createSub('j2-men-1', 'Area of parallelogram'),
          createSub('j2-men-2', 'Area of trapezium'),
          createSub('j2-men-3', 'Volume of cube'),
          createSub('j2-men-4', 'Volume of cuboid'),
        ]
      },
      {
        id: 'j2-stp',
        title: 'Statistics and Probability',
        subTopics: [
          createSub('j2-stp-1', 'Grouped data'),
          createSub('j2-stp-2', 'Simple probability'),
        ]
      }
    ]
  },
  {
    level: EducationLevel.JSS3,
    topics: [
      {
        id: 'j3-num',
        title: 'Number and Numeration',
        subTopics: [
          createSub('j3-num-1', 'Number bases'),
          createSub('j3-num-2', 'Standard form'),
        ]
      },
      {
        id: 'j3-alg',
        title: 'Algebra',
        subTopics: [
          createSub('j3-alg-1', 'Expansion of brackets'),
          createSub('j3-alg-2', 'Factorization'),
          createSub('j3-alg-3', 'Linear equations in one variable', true),
          createSub('j3-alg-4', 'Simultaneous linear equations'),
        ]
      },
      {
        id: 'j3-geo',
        title: 'Geometry',
        subTopics: [
          createSub('j3-geo-1', 'Angles in polygons'),
          createSub('j3-geo-2', 'Circle geometry'),
        ]
      },
      {
        id: 'j3-men',
        title: 'Mensuration',
        subTopics: [
          createSub('j3-men-1', 'Circumference of a circle'),
          createSub('j3-men-2', 'Area of a circle'),
          createSub('j3-men-3', 'Volume of a cylinder'),
        ]
      },
      {
        id: 'j3-sta',
        title: 'Statistics',
        subTopics: [
          createSub('j3-sta-1', 'Bar charts'),
          createSub('j3-sta-2', 'Histograms'),
        ]
      }
    ]
  },
  {
    level: EducationLevel.SS1,
    topics: [
      {
        id: 's1-alg',
        title: 'Algebra',
        subTopics: [
          createSub('s1-alg-1', 'Revision of JSS algebra'),
          createSub('s1-alg-2', 'Linear equations', true),
          createSub('s1-alg-3', 'Linear inequalities'),
          createSub('s1-alg-4', 'Direct variation'),
          createSub('s1-alg-5', 'Inverse variation'),
          createSub('s1-alg-6', 'Joint variation'),
        ]
      },
      {
        id: 's1-ind',
        title: 'Indices and Logarithms',
        subTopics: [
          createSub('s1-ind-1', 'Laws of indices'),
          createSub('s1-ind-2', 'Standard form'),
          createSub('s1-ind-3', 'Laws of logarithms'),
        ]
      },
      {
        id: 's1-geo',
        title: 'Geometry',
        subTopics: [
          createSub('s1-geo-1', 'Plane geometry'),
          createSub('s1-geo-2', 'Construction'),
          createSub('s1-geo-3', 'Polygons'),
        ]
      },
      {
        id: 's1-tri',
        title: 'Trigonometry',
        subTopics: [
          createSub('s1-tri-1', 'Trigonometric ratios'),
          createSub('s1-tri-2', 'Angles of elevation'),
          createSub('s1-tri-3', 'Angles of depression'),
        ]
      },
      {
        id: 's1-sta',
        title: 'Statistics',
        subTopics: [
          createSub('s1-sta-1', 'Mean'),
          createSub('s1-sta-2', 'Median'),
          createSub('s1-sta-3', 'Mode'),
          createSub('s1-sta-4', 'Simple probability'),
        ]
      }
    ]
  },
  {
    level: EducationLevel.SS2,
    topics: [
      {
        id: 's2-alg',
        title: 'Algebra',
        subTopics: [
          createSub('s2-alg-1', 'Quadratic equations', true),
          createSub('s2-alg-2', 'Simultaneous equations'),
          createSub('s2-alg-3', 'Algebraic fractions'),
        ]
      },
      {
        id: 's2-seq',
        title: 'Sequences and Series',
        subTopics: [
          createSub('s2-seq-1', 'Arithmetic progression'),
          createSub('s2-seq-2', 'Geometric progression'),
        ]
      },
      {
        id: 's2-tri',
        title: 'Trigonometry',
        subTopics: [
          createSub('s2-tri-1', 'Sine rule'),
          createSub('s2-tri-2', 'Cosine rule'),
          createSub('s2-tri-3', 'Bearings'),
        ]
      },
      {
        id: 's2-cog',
        title: 'Coordinate Geometry',
        subTopics: [
          createSub('s2-cog-1', 'Distance between two points'),
          createSub('s2-cog-2', 'Midpoint of a line'),
          createSub('s2-cog-3', 'Gradient'),
          createSub('s2-cog-4', 'Equation of a straight line'),
        ]
      },
      {
        id: 's2-men',
        title: 'Mensuration',
        subTopics: [
          createSub('s2-men-1', 'Surface area of solids'),
          createSub('s2-men-2', 'Volume of solids'),
        ]
      },
      {
        id: 's2-sta',
        title: 'Statistics',
        subTopics: [
          createSub('s2-sta-1', 'Grouped data'),
          createSub('s2-sta-2', 'Variance'),
          createSub('s2-sta-3', 'Standard deviation'),
        ]
      }
    ]
  },
  {
    level: EducationLevel.SS3,
    topics: [
      {
        id: 's3-alg',
        title: 'Algebra',
        subTopics: [
          createSub('s3-alg-1', 'Revision of algebra'),
          createSub('s3-alg-2', 'Matrices'),
          createSub('s3-alg-3', 'Determinants'),
          createSub('s3-alg-4', 'Linear programming'),
        ]
      },
      {
        id: 's3-tri',
        title: 'Trigonometry',
        subTopics: [
          createSub('s3-tri-1', 'Trigonometric identities'),
          createSub('s3-tri-2', 'Trigonometric equations'),
        ]
      },
      {
        id: 's3-cal',
        title: 'Calculus',
        subTopics: [
          createSub('s3-cal-1', 'Limits'),
          createSub('s3-cal-2', 'Differentiation'),
          createSub('s3-cal-3', 'Applications of differentiation'),
          createSub('s3-cal-4', 'Integration'),
          createSub('s3-cal-5', 'Area under curves'),
        ]
      },
      {
        id: 's3-stp',
        title: 'Statistics and Probability',
        subTopics: [
          createSub('s3-stp-1', 'Permutations'),
          createSub('s3-stp-2', 'Combinations'),
          createSub('s3-stp-3', 'Probability laws'),
        ]
      }
    ]
  }
];
